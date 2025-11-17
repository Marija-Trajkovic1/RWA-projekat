import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from "@angular/router";
import { selectAuthToken } from '../../../store/auth-store/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../../store/auth-store/auth.actions';
import { AsyncPipe } from '@angular/common';
import { selectSelectedPlace } from '../../../store/places-store/places.selectors';

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
  token$: Observable<string | null> = this.store.select(selectAuthToken);
  selectedPlace$ = this.store.select(selectSelectedPlace);

  constructor(public router: Router){
  }

  onLogout(): void{
    this.store.dispatch(logout());
  }
}
