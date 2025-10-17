import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatAnchor } from "@angular/material/button";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCard, 
    MatCardHeader, 
    MatCardTitle, 
    MatCardContent, 
    MatFormField, 
    MatInput,
    MatLabel, 
    MatAnchor,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb:FormBuilder){
    this.loginForm=this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['', Validators.required],
    });
  }

  onSubmit(){
      if(this.loginForm.valid){
        console.log('Login data:', this.loginForm.value);
      }
    }
}
