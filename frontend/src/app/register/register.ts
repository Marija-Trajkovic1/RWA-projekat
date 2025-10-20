import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatAnchor } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';

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

  constructor(private fb:FormBuilder, private authService:Auth, private router: Router){
    this.registerForm=this.fb.group({
      fullName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe({
        next:(response)=>{
          console.log('User registered: ', response);
          this.router.navigate(['/login']);
        }, 
        error:(err)=>{
          console.log('Registration failed:', err);
        }
      })
    }
  }
}
