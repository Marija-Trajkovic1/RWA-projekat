import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OPEN_STREET_URL } from '../../constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient){}

  getCityFromCoordinates(latitude: number, longitude: number): Observable<string | null>{
    return this.http.get<any>(`${OPEN_STREET_URL}/reverse?format=json&lat=${latitude}&lon=${longitude}`).pipe(
      map((result)=>result.address?.city || result.address?.town || result.address?.village || null)
    );
  }
  
}
