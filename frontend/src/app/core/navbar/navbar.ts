import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { selectAuthToken } from '../../../store/auth-store/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../../store/auth-store/auth.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink, 
    MatToolbar, 
    MatButton, 
    AsyncPipe
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private store = inject(Store);
  token$: Observable<string |null> = this.store.select(selectAuthToken);

  constructor(){}

  onLogout(): void{
    this.store.dispatch(logout());
  }
}
