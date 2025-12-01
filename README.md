# Pacman Carousel

High-performance Pac-Man–style Angular carousel component for both mobile and desktop.

Live demo: [`www.ifuyun.com`](https://www.ifuyun.com).

## Features
- Smooth, high-performance auto-play powered by `requestAnimationFrame`
- Pause on hover and automatically when the page is hidden
- Adaptive styles for mobile and desktop
- Supports title, caption, link, and custom open target
- Click callback for easy analytics/instrumentation
- No `zone.js`; signal-based implementation for top performance

## Installation
```
npm i pacman-carousel
```

Requirements: Angular 20+, TypeScript 5.9+

## Quick Start
Import and use directly in any component (Standalone):

```ts
// app.ts
import { Component, signal } from '@angular/core';
import { Carousel, CarouselComponent } from 'pacman-carousel';

@Component({
  selector: 'app-root',
  imports: [CarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  carousels = signal<Carousel[]>([
    {
      id: '00mig749bu1hbn23',
      title: '为生存而疾驰',
      caption: '马赛马拉国家保护区的猎豹',
      url: 'https://bing.ireadpay.com/wallpaper/00mig749bu1hbn23.jpg',
      link: 'https://wallpaper.ifuyun.com/detail/00mig749bu1hbn23',
      target: '_blank'
    },
    {
      id: '00mi91wxvdo73w83',
      title: '哎呀，好冷啊！',
      caption: '荷兰梵高国家森林公园的马鹿雄鹿',
      url: 'https://bing.ireadpay.com/wallpaper/00mi91wxvdo73w83.jpg',
      link: 'https://wallpaper.ifuyun.com/detail/00mi91wxvdo73w83',
      target: '_blank'
    },
    {
      id: '00mibwsmwtab8mz8',
      title: '冰雪凝息之处',
      caption: '冰山上天然形成的拱门',
      url: 'https://bing.ireadpay.com/wallpaper/00mibwsmwtab8mz8.jpg',
      link: 'https://wallpaper.ifuyun.com/detail/00mibwsmwtab8mz8',
      target: '_blank'
    },
    {
      id: '00mi7mh32t9nkcls',
      title: '白色回响',
      caption: '瓦尔·布兰德特',
      url: 'https://bing.ireadpay.com/wallpaper/00mi7mh32t9nkcls.jpg',
      link: 'https://wallpaper.ifuyun.com/detail/00mi7mh32t9nkcls',
      target: '_blank'
    }
  ]);

  onCarouselClick(carousel: any) {
    console.log('Clicked:', carousel);
  }
}
```

```html
<!-- app.html -->
<div style="display: flex; justify-content: center; margin: 24px">
  <pacman-carousel [carousels]="carousels()" (click)="onCarouselClick($event)"></pacman-carousel>
</div>
```

## API Overview
- Input `carousels: Carousel[]`: the carousel data (at least 1 item)
- Input `isMobile?: boolean`: whether to use mobile styles, default false
- Input `isBrowser?: boolean`: client-side rendering flag, default true
- Output `click: OutputEmitterRef<Carousel>`: emitted when a slide is clicked

`Carousel` interface:
- `id: string`
- `title: string`
- `caption: string`
- `url: string` (image URL)
- `link?: string` (carousel link URL)
- `target: '_blank' | '_self' | '_top'`
- `order?: number`

## Examples & Development
- Start demo: `npm start` (opens [`http://localhost:4200`](http://localhost:4200))
- Build library: `npm run build:carousel` (outputs to `dist/carousel`)
- Publish library: `cd dist/carousel && npm publish`

## Project Structure
- Carousel component: `projects/carousel`
- Demo application: `projects/demo`

Feedback and contributions are welcome!
