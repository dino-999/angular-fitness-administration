import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { News } from './news.model';
import { NewsService } from './news.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit,OnDestroy {
  
  news:any[] ;
  subscription: Subscription;

  displayedColumns: string[] = ['title', 'newsInfo', 'category', 'createdDate', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,private dialog: MatDialog) {

   }

  ngOnInit(): void {

    this.getNews();
   
  }

  getNews(){
    this.dataService.getList('news').subscribe({
      next: (result) => {
         this.news=result;
         this.dataSource=new MatTableDataSource(result);
         this.dataSource.paginator=this.paginator;
         this.dataSource.sort = this.sort;
        },
      error: (err) => { alert('Error occuered');}
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getNews();
      }
    })
  }

  deleteNews(id: string) {
    this.dataService.delete(id,'news')
    .subscribe({
      next:(res)=>{
         alert("News deleted successfully");
          this.getNews();
        },
        error:(err)=>{alert("Error occurred while deleting...");}
    })
  }
  editNews(row:any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getNews();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}
