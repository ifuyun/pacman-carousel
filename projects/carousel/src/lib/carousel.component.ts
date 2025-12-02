import { NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  ViewChild
} from '@angular/core';
import { Carousel } from './carousel.interface';

@Component({
  selector: 'pacman-carousel',
  imports: [NgStyle],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.less',
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  carousels = input<Carousel[]>([]);
  width = input<string>('720px');
  height = input<string>('360px');
  indicatorPadding = input<string>('16px 24px');
  isBrowser = input<boolean>(true);
  click = output<Carousel>();

  @ViewChild('carouselBody') carouselBody!: ElementRef;

  carouselList = computed<Carousel[]>(() => {
    const list = this.carousels();
    const length = list.length;

    if (length < 1) {
      return [];
    }

    const firstItem = list[0];
    const lastItem = list[length - 1];

    if (length < 2 || lastItem.id !== firstItem.id) {
      return [...list, { ...firstItem }];
    }

    return list;
  });
  activeIndex = signal(0);
  isRevert = signal(false);

  indicatorRange = computed(() => {
    const size = this.carouselList().length - 1;
    return Array.from({ length: size }, (_, i) => i);
  });

  private interval = signal(3000);
  private isPaused = signal(false);
  private lastTimestamp = signal(0);
  private rafId = signal<number | null>(null);

  ngOnInit(): void {
    // this.initCarousels();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser()) {
      this.start();
      document.addEventListener('visibilitychange', this.onVisibilityChange);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser()) {
      this.pause();
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
  }

  carouselMouseOver() {
    this.isPaused.set(true);
    this.pause();
  }

  carouselMouseOut() {
    this.isPaused.set(false);
    this.start();
  }

  switchCarousel(index: number) {
    if (index === this.activeIndex()) {
      return;
    }
    this.isRevert.set(index < this.activeIndex());
    this.activeIndex.set(index);
    this.set();
  }

  clickCarousel(carousel: Carousel) {
    this.click.emit(carousel);
  }

  private loop = (timestamp: number) => {
    if (!this.lastTimestamp()) {
      this.lastTimestamp.set(timestamp);
    }
    if (timestamp - this.lastTimestamp() >= this.interval()) {
      this.next();
      this.lastTimestamp.set(timestamp);
    }

    this.rafId.set(requestAnimationFrame(this.loop));
  };

  private start() {
    if (!this.rafId()) {
      this.lastTimestamp.set(0);
      this.rafId.set(requestAnimationFrame(this.loop));
    }
  }

  private pause() {
    if (this.rafId()) {
      cancelAnimationFrame(<number>this.rafId());

      this.rafId.set(null);
    }
  }

  private next() {
    this.isRevert.set(false);
    this.activeIndex.set((this.activeIndex() + 1) % this.carouselList().length);
    this.set();
  }

  private set(): void {
    this.carouselBody.nativeElement.style.transitionDuration = '';

    if (this.activeIndex() === this.carouselList().length - 1) {
      window.setTimeout(() => {
        this.activeIndex.set(0);
        this.carouselBody.nativeElement.style.transitionDuration = '0s';
        this.carouselBody.nativeElement.style.transform = 'translateX(0%)';
      }, 300);
    }
  }

  private onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      this.pause();
    } else if (!this.isPaused()) {
      this.start();
    }
  };
}
