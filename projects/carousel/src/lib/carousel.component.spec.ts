import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CarouselComponent } from './carousel.component';
import { Carousel } from './carousel.interface';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let rafSpy: any;
  let cafSpy: any;

  const A: Carousel = { id: 'a', title: 'A', caption: 'A', url: 'u1', link: 'l1', target: '_blank' };
  const B: Carousel = { id: 'b', title: 'B', caption: 'B', url: 'u2', link: 'l2', target: '_blank' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CarouselComponent] }).compileComponents();
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1 as any);
    cafSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  it('creates component', async () => {
    expect(component).toBeTruthy();
  });

  it('computes carouselList for empty list', async () => {
    fixture.componentRef.setInput('carousels', []);
    fixture.detectChanges();
    expect(component.carouselList()).toEqual([]);
    expect(component.indicatorRange().length).toBe(0);
  });

  it('duplicates first item when length < 2', async () => {
    fixture.componentRef.setInput('carousels', [A]);
    fixture.detectChanges();
    expect(component.carouselList().length).toBe(2);
    expect(component.carouselList()[0].id).toBe('a');
    expect(component.carouselList()[1].id).toBe('a');
    expect(component.indicatorRange().length).toBe(1);
  });

  it('appends first when last.id !== first.id', async () => {
    fixture.componentRef.setInput('carousels', [A, B]);
    fixture.detectChanges();
    expect(component.carouselList().length).toBe(3);
    expect(component.carouselList()[0].id).toBe('a');
    expect(component.carouselList()[2].id).toBe('a');
    expect(component.indicatorRange().length).toBe(2);
  });

  it('does not append when last.id === first.id', async () => {
    fixture.componentRef.setInput('carousels', [A, { ...A }]);
    fixture.detectChanges();
    expect(component.carouselList().length).toBe(2);
    expect(component.carouselList()[0].id).toBe('a');
    expect(component.carouselList()[1].id).toBe('a');
    expect(component.indicatorRange().length).toBe(1);
  });

  it('applies width, height, and indicator padding styles', async () => {
    fixture.componentRef.setInput('carousels', [A]);
    fixture.componentRef.setInput('width', '800px');
    fixture.componentRef.setInput('height', '400px');
    fixture.componentRef.setInput('indicatorPadding', '12px 16px');
    fixture.detectChanges();
    const wrap: HTMLElement = fixture.nativeElement.querySelector('.carousel-wrap');
    const body: HTMLElement = fixture.nativeElement.querySelector('.carousel');
    const indicator: HTMLElement = fixture.nativeElement.querySelector('.indicator');
    expect(wrap.style.width).toBe('800px');
    expect(body.style.height).toBe('400px');
    expect(indicator.style.padding).toBe('12px 16px');
  });

  it('starts RAF and adds visibility listener when isBrowser=true', async () => {
    fixture.componentRef.setInput('carousels', [A]);
    const addSpy = vi.spyOn(document, 'addEventListener');
    fixture.detectChanges();
    expect(rafSpy).toHaveBeenCalled();
    expect(component['rafId']()).toBe(1);
    expect(addSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  it('does not start when isBrowser=false', async () => {
    fixture.destroy();
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isBrowser', false);
    fixture.componentRef.setInput('carousels', [A]);
    rafSpy.mockClear();
    component.isBrowser = (() => false) as any;
    component.ngAfterViewInit();
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it('pauses on mouseover and resumes on mouseout', async () => {
    fixture.componentRef.setInput('carousels', [A]);
    fixture.detectChanges();
    component.carouselMouseOver();
    expect(component['isPaused']()).toBe(true);
    expect(cafSpy).toHaveBeenCalledWith(1);
    component.carouselMouseOut();
    expect(component['isPaused']()).toBe(false);
    expect(rafSpy.mock.calls.length).toBeGreaterThan(1);
  });

  it('switches carousel and sets revert flag', async () => {
    fixture.componentRef.setInput('carousels', [A, B]);
    fixture.detectChanges();
    component.activeIndex.set(1);
    component.switchCarousel(1);
    expect(component.activeIndex()).toBe(1);
    component.switchCarousel(0);
    expect(component.activeIndex()).toBe(0);
    expect(component['isRevert']()).toBe(true);
  });

  it('next increments index and updates transform', async () => {
    fixture.componentRef.setInput('carousels', [A, B]);
    fixture.detectChanges();
    const body: HTMLElement = component.carouselBody.nativeElement;
    const before = body.style.transform;
    component['next']();
    fixture.detectChanges();
    const after = body.style.transform;
    expect(component.activeIndex()).toBe(1);
    expect(after).not.toBe(before);
  });

  it('set resets to first when at cloned last', async () => {
    fixture.componentRef.setInput('carousels', [A]);
    fixture.detectChanges();
    component.activeIndex.set(component.carouselList().length - 1);
    (component as any)['set']();
    await new Promise((r) => setTimeout(r, 320));
    expect(component.activeIndex()).toBe(0);
    const body: HTMLElement = component.carouselBody.nativeElement;
    expect(body.style.transitionDuration).toBe('0s');
    expect(body.style.transform).toMatch(/translateX\(-?0%\)/);
  });

  it('emits click event with carousel data', async () => {
    const spy = vi.spyOn(component.click, 'emit');
    component.clickCarousel(A);
    expect(spy).toHaveBeenCalledWith(A);
  });

  it('indicator dots count matches indicatorRange', async () => {
    fixture.componentRef.setInput('carousels', [A, B]);
    fixture.detectChanges();
    const dots = fixture.nativeElement.querySelectorAll('.dots li');
    expect(dots.length).toBe(component.indicatorRange().length);
  });

  it('visibilitychange pauses/resumes based on document state and isPaused', async () => {
    fixture.componentRef.setInput('carousels', [A]);
    fixture.detectChanges();
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    (component as any)['onVisibilityChange']();
    expect(cafSpy).toHaveBeenCalled();
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    component['isPaused'].set(true);
    (component as any)['onVisibilityChange']();
    const preCount = rafSpy.mock.calls.length;
    component['isPaused'].set(false);
    (component as any)['onVisibilityChange']();
    expect(rafSpy.mock.calls.length).toBeGreaterThan(preCount);
  });
});
