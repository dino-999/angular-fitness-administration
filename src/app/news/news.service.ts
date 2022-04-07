import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../service/data.service';
import { News } from './news.model';



@Injectable()
export class NewsService {
  newsChanged = new Subject<News[]>();

  private news: News[] = [];

  constructor() {}

  setNews(news: News[]) {
    this.news = news;
    this.newsChanged.next(this.news.slice());
  }

  getNews() {
    return this.news.slice();
  }

  getNew(index: number) {
    return this.news[index];
  }

  

  addNews(newNews: News) {
    this.news.push(newNews);
    this.newsChanged.next(this.news.slice());
  }

  updateNews(index: number, newNews: News) {
    this.news[index] = newNews;
    this.newsChanged.next(this.news.slice());
  }

  deleteNews(index: number) {
    this.news.splice(index, 1);
    this.newsChanged.next(this.news.slice());
  }
}
