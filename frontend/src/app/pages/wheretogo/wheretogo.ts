import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Store } from '@ngrx/store';
import { selectAllPlaces, selectPlacesError, selectPlacesLoading } from '../../../store/places-store/places.selectors';
import { loadPlaces, selectPlace } from '../../../store/places-store/places.actions';
import { Notification } from '../../../components/notification/notification';
import { AsyncPipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, withLatestFrom } from 'rxjs';
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
    ReactiveFormsModule
  ],
  templateUrl: './wheretogo.html',
  styleUrls: ['./wheretogo.scss', '../../styles/shared-style.scss']
})
export class WhereToGo implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private snackBar  = inject(Notification);
  private formBuilder = inject(FormBuilder);

  cityForm: FormGroup;

  places$ = this.store.select(selectAllPlaces);
  loading$ = this.store.select(selectPlacesLoading);
  error$ = this.store.select(selectPlacesError);

  constructor(){
    this.cityForm=this.formBuilder.group({
      city: [null]
    });
  }

  ngOnInit() {
    this.store.dispatch(loadPlaces());
    this.error$.subscribe(error =>{
      if(error){
        this.snackBar.showSnackBar(error, 4000, 'error');
      }
    });

    this.cityForm.get('city')?.valueChanges
    .pipe(
      withLatestFrom(this.places$),
      filter(([cityId, places]) => !!places.length)
    ).subscribe(([cityId, places])=>{
      if(cityId){
        this.places$.subscribe(places=>{
          const place = places.find(p=>p.id===cityId);
          if(place){
            this.store.dispatch(selectPlace({place}));
            console.log('Selected: ', place);
            this.router.navigate(['/placemap']);
          }
        })
      }
    })
  }

  useCurrentLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Current location: ', latitude, longitude);
        },
        (error)=>{
          console.error('Error getting location: ', error);
          this.snackBar.showSnackBar('Unable to get your location. Please allow location access.', 4000, 'error');
        }
      )
    } else{
      this.snackBar.showSnackBar('Geolocation is not supported by your browser.', 4000, 'error');
    }
  }
}
