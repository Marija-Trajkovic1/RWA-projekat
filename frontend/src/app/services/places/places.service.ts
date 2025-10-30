import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Place } from '../../../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private http:HttpClient){}

  getAvailablePlaces(){
    return this.http.get<Place[]>(`${environment.apiUrl}/places/getAvailablePlaces`);
  }
}
