import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Store } from '@ngrx/store';
import { selectAllPlaces, selectPlacesError, selectPlacesLoading } from '../../../store/places-store/places.selectors';
import { loadPlaces } from '../../../store/places-store/places.actions';
import { Notification } from '../../../components/notification/notification';
import { AsyncPipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-wheretogo',
  imports: [
    MatCard, 
    MatCardHeader, 
    MatCardTitle, 
    MatCardContent, 
    MatFormField,  
    MatLabel,
    MatButton,
    AsyncPipe,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './wheretogo.html',
  styleUrls: ['./wheretogo.scss', '../../styles/shared-style.scss']
})
export class WhereToGo implements OnInit {
  private store = inject(Store);
  private snackBar  = inject(Notification);
  places$ = this.store.select(selectAllPlaces);
  loading$ = this.store.select(selectPlacesLoading);
  error$ = this.store.select(selectPlacesError);

  constructor(){}

  ngOnInit() {
    this.store.dispatch(loadPlaces());
    this.error$.subscribe(error =>{
      if(error){
        this.snackBar.showSnackBar(error, 4000, 'error');
      }
    });
  }

  useCurrentLocation(){

  }
}
