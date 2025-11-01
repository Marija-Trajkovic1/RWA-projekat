import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Store } from '@ngrx/store';
import { selectAllPlaces, selectPlacesError, selectPlacesLoading, selectSelectedPlace } from '../../../store/places-store/places.selectors';
import { loadPlaces, selectPlace } from '../../../store/places-store/places.actions';
import { SnackBar } from '../../../components/notification/snack-bar';
import { AsyncPipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, filter, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { LocationService } from '../../services/location/location.service';
import { PlacesService } from '../../services/places/places.service';
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
  private snackBar  = inject(SnackBar);
  private formBuilder = inject(FormBuilder);
  private placesService = inject(PlacesService);
  private locationService = inject(LocationService)

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
     if(!navigator.geolocation){
      this.snackBar.showSnackBar('Geolocation is not supported by your browser.', 4000, 'error');
      return;
     }

     const geolocation$ =new Observable<GeolocationPosition>(observer =>{
      navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position);
          observer.complete();
        },
        error => observer.error(error)
      )
     });

     geolocation$.pipe(
      switchMap(position=>{
        const latitude = position.coords.latitude;
        const longitude =position.coords.longitude;
        
        return this.locationService.getCityFromCoordinates(latitude,longitude);
      }),
      switchMap(placeName=>{
        if(!placeName){
          this.snackBar.showSnackBar('Unknown location! Try again!', 4000, 'error');
          return EMPTY;
        }

        return this.placesService.getPlaceByName(placeName).pipe(
          tap(place=>{
            if(!place){
              this.snackBar.showSnackBar('Informations for ${placeName} is not available yet!', 4000, 'info');
            }
            
          })
        )
      })
     ).subscribe({
      next:place =>{
        if(place){
          this.store.dispatch(selectPlace({place}));
          this.snackBar.showSnackBar(`Location: ${place.placeName}`, 4000, 'success');
          this.router.navigate(['/placemap']);
        }
      },
      error: err =>{
        console.error('Error while getting location data:', err);
        this.snackBar.showSnackBar('Unable to get your location. Please allow location access.', 4000, 'error');
      }
     })
  }

}
