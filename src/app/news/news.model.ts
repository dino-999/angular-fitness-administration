

export class News {
    id: string;
    title: string;
    newsInfo: string;
    category: any;
    createdDate: string;


  constructor(id: string, title: string, newsInfo: string, category: any,createdDate: string) {
    this.id = id;
    this.title = title;
    this.newsInfo = newsInfo;
    this.category = category;
    this.createdDate = createdDate;
  }
}