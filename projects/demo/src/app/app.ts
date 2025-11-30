import { Component, signal } from '@angular/core';
import { Carousel, CarouselComponent } from 'carousel';

@Component({
  selector: 'app-root',
  imports: [CarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.less'
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
