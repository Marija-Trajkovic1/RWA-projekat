import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-attraction-rating-component',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './attraction-rating-component.html',
  styleUrl: './attraction-rating-component.scss'
})
export class AttractionRatingComponent {
  
  ratingForm: FormGroup;
  @Input() attractionId!: number;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AttractionRatingComponent>){
    this.ratingForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    })
  }

  submit(){
    if(this.ratingForm.valid){
      this.dialogRef.close(this.ratingForm.value.rating);
    } 
  }

  cancel(){
    this.dialogRef.close(null);
  }
}
