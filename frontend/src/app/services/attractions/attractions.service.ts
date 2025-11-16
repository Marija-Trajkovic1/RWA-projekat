import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AttractionSummary } from '../../models/attraction.model';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { DURATION, ERROR_FETCHING_ATTRACTIONS_MESSAGE } from '../../constants/snack-bar.constants';
import { SnackBar } from '../../components/notification/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  private snackBar=inject(SnackBar);
  constructor(private http:HttpClient){}

  getAttractionsForPlace(placeName: string): Observable<AttractionSummary[]>{
    return this.http.get<AttractionSummary[]>(`${environment.placesApiUrl}/getAttractionsForPlace?placeName=${placeName}`).pipe(
      catchError(error=>{
        this.snackBar.showSnackBar(ERROR_FETCHING_ATTRACTIONS_MESSAGE, DURATION);
        return of([]);
      })
    );
  }
}
