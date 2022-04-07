import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  actionBtn: string = 'Add';
  newsForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private ref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      newsInfo: ['', Validators.required],
      category: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.newsForm.controls['title'].setValue(this.editData.title);
      this.newsForm.controls['newsInfo'].setValue(this.editData.newsInfo);
      this.newsForm.controls['category'].setValue(this.editData.category);
    }
  }

  addNews() {
    console.log(this.newsForm.value);
    if (!this.editData) {
      if (this.newsForm.valid) {
        this.data.add(this.newsForm.value, 'news').subscribe({
          next: (res) => {
            alert('News added successfully!');
            this.newsForm.reset();
            this.ref.close('save');
          },
          error: (err) => {
            alert('Error while adding news');
          },
        });
      }
    }else{
      this.updateNews();
    }
  }

  updateNews(){
    this.data.update(this.newsForm.value,'news',this.editData.id)
    .subscribe({
      next:(res)=>{ 
        alert("News updated successfully!");
        this.newsForm.reset();
        this.ref.close('update');
    }, 
    error: (err) => {alert("Error occuered while updating...")}
    })
  }
}
