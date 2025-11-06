import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Attraction } from '../../models/attraction.model';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { DURATION, STYLE_ERROR } from '../../constants/snack-bar.constants';
import { SnackBar } from '../../components/notification/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  private snackBar=inject(SnackBar);
  constructor(private http:HttpClient){}

  getAttractionsForPlace(placeName: string): Observable<Attraction[]>{
    return this.http.get<Attraction[]>(`${environment.apiUrl}/places/getAttractionsForPlace?placeName=${placeName}`).pipe(
      catchError(error=>{
        this.snackBar.showSnackBar(`Error while loading attractions for place: ${error}`, DURATION, STYLE_ERROR);
        return of([]);
      })
    );
  }
}
