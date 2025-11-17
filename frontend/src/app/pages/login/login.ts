import { Component, inject } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatButton } from "@angular/material/button";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../store/auth-store/auth.actions';
import { LoginDto } from '../../dtos/login.dto';
import { selectAuthError, selectAuthLoading } from '../../../store/auth-store/auth.selectors';
import { AuthState } from '../../../store/store.interfaces';
import { AsyncPipe } from '@angular/common';

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
    MatButton,
    ReactiveFormsModule,
    RouterLink,
    MatError,
    AsyncPipe
],
  templateUrl: './login.html',
  styleUrls: ['./login.scss', '../../styles/shared-style.scss']
})
export class Login {
  private store = inject<Store<{ auth: AuthState }>>(Store);
  private formBuilder = inject(FormBuilder);
  loginForm: FormGroup;
  
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  constructor() {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['', Validators.required],
    });
  }
  onLogin(){
      if(this.loginForm.valid){
        const loginData :LoginDto = this.loginForm.value;
        this.store.dispatch(login({loginData}));
      }
    }
}
