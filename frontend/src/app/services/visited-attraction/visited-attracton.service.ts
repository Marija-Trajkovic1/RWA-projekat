import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VisitedAttraction } from '../../models/visited.model';

@Injectable({
  providedIn: 'root'
})
export class VisitedAttractonService {
  constructor(private http: HttpClient){}

  getIsVisitedAttraction(attractionId: number): Observable<{isVisited: boolean}>{
    return this.http.get<{isVisited: boolean}>(
      `${environment.visitedAttracttionsApiUrl}/getVisitedAttraction/${attractionId}`
    )
  }

  updateVisitedAttractionStatus(attractionId: number, rating: number): Observable<{visitedAttraction: VisitedAttraction}>{
    return this.http.post<{visitedAttraction: VisitedAttraction}>(
      `${environment.visitedAttracttionsApiUrl}/updateVisitedAttractionStatus/${attractionId}`,
      {rating}
    )
  }

  getAverageRatingForAttraction(attractionId: number): Observable<{averageRating:number}>{
    return this.http.get<{averageRating:number}>(
      `${environment.visitedAttracttionsApiUrl}/getAverageRatingForAttraction/${attractionId}`
    )
  }
}