import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDatesComponent } from './training-dates.component';

describe('TrainingDatesComponent', () => {
  let component: TrainingDatesComponent;
  let fixture: ComponentFixture<TrainingDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
