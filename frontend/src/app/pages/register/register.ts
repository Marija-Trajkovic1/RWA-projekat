import { Component, inject } from '@angular/core';
import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatHint, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatAnchor } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { SnackBar } from '../../components/notification/snack-bar';
import { RegisterDto } from '../../dtos/register.dto';
import { DURATION, ENTER_VALID_DATA_MESSAGE, REGISTRATION_FAILED_MESSAGE, SUCCEESSFULY_REGISTERED_MESSAGE } from '../../constants/snack-bar.constants';
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
  private snackBar= inject(SnackBar);
  registerForm: FormGroup;

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
          this.snackBar.showSnackBar(SUCCEESSFULY_REGISTERED_MESSAGE, DURATION);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, DURATION);
    
        }, 
        error:(err)=>{
          console.log('Registration failed:', err);
          
          this.snackBar.showSnackBar(REGISTRATION_FAILED_MESSAGE, DURATION);
        }
      })
    }else{
      this.snackBar.showSnackBar(ENTER_VALID_DATA_MESSAGE, DURATION);
    }
  }
}
