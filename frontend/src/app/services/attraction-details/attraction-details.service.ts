import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SnackBar } from '../../components/notification/snack-bar';
import { DURATION, ERROR_LOADING_ATTRACTION_DETAILS_MESSAGE } from '../../constants/snack-bar.constants';
import { AttractionDetails } from '../../models/attraction.model';

@Injectable({
  providedIn: 'root'
})
export class AttractionDetailsService {
  private snackBar= inject(SnackBar);
  constructor(private http : HttpClient) {}

  getDetailsForAttraction(id: number): Observable<AttractionDetails>{
    return this.http.get<AttractionDetails>(`${environment.attractionApiUrl}/getDetailsForAttraction?id=${id}`).pipe(
      catchError(error => {
        this.snackBar.showSnackBar(ERROR_LOADING_ATTRACTION_DETAILS_MESSAGE, DURATION);
        return EMPTY;
      })
    )
  }
}
