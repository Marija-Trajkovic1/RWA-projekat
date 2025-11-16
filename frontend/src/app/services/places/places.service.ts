import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Place } from '../../models/place.model';
import { catchError, Observable, of } from 'rxjs';
import { SnackBar } from '../../components/notification/snack-bar';
import { DURATION, ERROR_FETCHING_PLACES_MESSAGE } from '../../constants/snack-bar.constants';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private snackBar = inject(SnackBar)
  constructor(private http:HttpClient){}

  getAvailablePlaces(){
    return this.http.get<Place[]>(`${environment.placesApiUrl}/getAvailablePlaces`);
  }

  getPlaceByName(placeName: string): Observable<Place | null>{
    return this.http.get<Place | null>(`${environment.placesApiUrl}/getPlaceByName?placeName=${placeName}`).pipe(
      catchError(error=>{
        this.snackBar.showSnackBar(ERROR_FETCHING_PLACES_MESSAGE, DURATION);
        return of(null);
      })
    );
  }
}
