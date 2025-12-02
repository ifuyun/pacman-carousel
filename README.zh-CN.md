# Pacman Carousel

吃豆人（Pac-Man）风格的高性能 Angular 轮播图组件。

English: `README.md`

完整效果参见：[`www.ifuyun.com`](https://www.ifuyun.com)。

## 特性
- 自动轮播，基于 `requestAnimationFrame`，平滑且高性能
- 悬停暂停与页面不可见时自动暂停
- 移动端与桌面端样式自适应
- 支持标题、描述、链接与自定义打开方式
- 支持点击轮播图回调，便于埋点
- 无`zone.js`，`signal`方式实现高性能轮播图

## 安装
```
npm i pacman-carousel
```

要求：Angular 20+，TypeScript 5.9+

## 快速开始
在任意组件中直接导入并使用（Standalone）：

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
  <pacman-carousel [carousels]="carousels()"
                   [width]="'720px'"
                   [height]="'360px'"
                   [indicatorPadding]="'16px 24px'"
                   (click)="onCarouselClick($event)"></pacman-carousel>
</div>
```

## API 概览
- 输入 `carousels: Carousel[]`：轮播图数据（至少 1 项）
- 输入 `width: string`（默认 `'720px'`）：容器宽度
- 输入 `height: string`（默认 `'360px'`）：轮播高度
- 输入 `indicatorPadding: string`（默认 `'16px 24px'`）：指示器栏内边距
- 输入 `isBrowser?: boolean`（默认 `true`）：是否客户端模式（CSR）
- 输出 `click: OutputEmitterRef<Carousel>`：点击轮播图时触发

`Carousel` 接口定义：
- `id: string`
- `title: string`
- `caption: string`
- `url: string`（图片地址）
- `link?: string`（轮播图链接地址）
- `target: '_blank' | '_self' | '_top'`
- `order?: number`

## 示例与开发
- 启动演示：`npm start`（打开 [`http://localhost:4200`](http://localhost:4200)）
- 构建库：`npm run build:carousel`（输出到 `dist/carousel`）
- 发布库：`cd dist/carousel && npm publish`

## 目录结构
- 轮播图组件：`projects/carousel`
- 演示应用：`projects/demo`

欢迎反馈与贡献！
