export interface Carousel {
  id: string;
  title: string;
  caption: string;
  url: string;
  link?: string;
  target: '_blank' | '_self' | '_top';
  order?: number;
}
