import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../service/data.service';
import { TrainingDialogComponent } from '../training-dialog/training-dialog.component';

@Component({
  selector: 'app-training-dates',
  templateUrl: './training-dates.component.html',
  styleUrls: ['./training-dates.component.scss']
})
export class TrainingDatesComponent implements OnInit {


  
  displayedColumns: string[] = ['title', 'dateOfTraining','people', 'action'];
  dataSource: MatTableDataSource<any>;
  count:number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService,private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getTrainingData();
  }


  openDialog() {
    this.dialog.open(TrainingDialogComponent, {
     width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getTrainingData();
      }
    })
  }

  getTrainingData(){
    this.dataService.getList('training').subscribe({
      next: (result) => {
        
         this.dataSource=new MatTableDataSource(result);
         this.dataSource.paginator=this.paginator;
         this.dataSource.sort = this.sort;
        },
      error: (err) => { alert('Error occuered');}
    });
  }

  deleteTrainingDate(id: string) {
    this.dataService.delete(id,'training')
    .subscribe({
      next:(res)=>{
         alert("Training date deleted successfully");
          this.getTrainingData();
        },
        error:(err)=>{alert("Error occurred while deleting...");}
    })
  }
  editTrainingDate(row:any){
    this.dialog.open(TrainingDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getTrainingData();
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
}
