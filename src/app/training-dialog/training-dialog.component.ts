import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-training-dialog',
  templateUrl: './training-dialog.component.html',
  styleUrls: ['./training-dialog.component.scss']
})
export class TrainingDialogComponent implements OnInit {

  actionBtn: string = 'Add';
  trainingForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private ref: MatDialogRef<TrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.trainingForm = this.formBuilder.group({
      title: ['', Validators.required],
      dateOfTraining: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.trainingForm.controls['title'].setValue(this.editData.title);
      this.trainingForm.controls['dateOfTraining'].setValue(this.editData.dateOfTraining);
    }
  }

  addTrainingDate() {
    console.log(this.trainingForm.value);
    if (!this.editData) {
      if (this.trainingForm.valid) {
        this.data.add(this.trainingForm.value, 'training').subscribe({
          next: (res) => {
            alert('Training date added successfully!');
            this.trainingForm.reset();
            this.ref.close('save');
          },
          error: (err) => {
            alert('Error while adding news');
          },
        });
      }
    }else{
      this.updateTrainingDate();
    }
  }

  updateTrainingDate(){
    this.data.update(this.trainingForm.value,'training',this.editData.id)
    .subscribe({
      next:(res)=>{ 
        alert("Training date updated successfully!");
        this.trainingForm.reset();
        this.ref.close('update');
    }, 
    error: (err) => {alert("Error occuered while updating...")}
    })
  }

}
