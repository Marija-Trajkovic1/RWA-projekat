import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Place } from '../../../models/place.model';
import { catchError, Observable, of } from 'rxjs';
import { SnackBar } from '../../../components/notification/snack-bar';
import { DURATION, STYLE_ERROR } from '../../constants/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private snackBar = inject(SnackBar)
  constructor(private http:HttpClient){}

  getAvailablePlaces(){
    return this.http.get<Place[]>(`${environment.apiUrl}/places/getAvailablePlaces`);
  }

  getPlaceByName(placeName: string): Observable<Place | null>{
    return this.http.get<Place | null>(`${environment.apiUrl}/places/getPlaceByName?placeName=${placeName}`).pipe(
      catchError(error=>{
        this.snackBar.showSnackBar('Error while fetching a place', DURATION, STYLE_ERROR);
        return of(null);
      })
    );
  }
}
