import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatAnchor } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatCardTitle,
    MatLabel,
    MatAnchor,
    RouterLink,
    ReactiveFormsModule,
],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb:FormBuilder){
    this.registerForm=this.fb.group({
      fullName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      console.log('Regoster data:', this.registerForm.value);
    }
  }
}
