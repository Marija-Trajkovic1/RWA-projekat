import { Component, inject } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatHint, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatAnchor } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Notification } from '../../../components/notification/notification';
import { RegisterDto } from '../../dtos/register.dto';
@Component({
  selector: 'app-register',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatHint,
    MatCardTitle,
    MatLabel,
    MatAnchor,
    RouterLink,
    ReactiveFormsModule,
],
  templateUrl: './register.html',
  styleUrls: ['./register.scss','../../styles/shared-style.scss']
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private snackBar= inject(Notification);
  registerForm: FormGroup;
  duration :number =10000;

  constructor(private authService:AuthService, private router: Router){
    this.registerForm=this.formBuilder.group({
      fullName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      username:['', Validators.required],
      password:['', Validators.required],
    })
  }

  onRegister(){
    if(this.registerForm.valid){
      const registerData:  RegisterDto = this.registerForm.value;
      this.authService.register(registerData).subscribe({
        next:(response)=>{
          console.log('User registered: ', response);
          this.snackBar.showSnackBar('Successfully registered! Redirecting...', this.duration,'success');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, this.duration);
    
        }, 
        error:(err)=>{
          console.log('Registration failed:', err);
          
          this.snackBar.showSnackBar('Registration failed! Check your data!',this.duration, 'error');
        }
      })
    }else{
      this.snackBar.showSnackBar('Enter valid data to register!', this.duration, 'info');
    }
  }
}
