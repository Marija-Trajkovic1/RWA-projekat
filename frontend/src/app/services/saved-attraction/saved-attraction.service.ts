import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavedAttractionService {
  constructor(private http: HttpClient){}

  getSavedAttraction(attractionId: number): Observable<{isSaved: boolean}>{
    return this.http.get<{ isSaved: boolean}>(
      `${environment.apiUrl}/saved-attractions/getSavedAttraction/${attractionId}`
    );
  }

  updateSavedAttractionStatus(attractionId: number): Observable<{isSaved: boolean}>{
    return this.http.post<{ isSaved: boolean}>(
      `${environment.apiUrl}/saved-attractions/updateSavedAttractionStatus/${attractionId}`,
      {}
    );
  }

}
