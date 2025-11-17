import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PLACE_NAME_REGULAR } from '../../constants/regular-expressions.constants';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient){}   

  getPlaceFromCoordinates(latitude: number, longitude: number):Observable<string | null>{
    const url=`${environment.openCageBaseUrl}?q=${latitude}+${longitude}&key=${environment.opencageApiKey}&language=en&pretty=1`;
    return this.http.get<any>(url).pipe(
      map((response)=>{
        const components = response.results[0].components;
        if(!components) return null;

        const placeName = components.municipality || components.city || components.town || components.village || null;
        console.log('Calculated place from opencage: ', placeName);
        return placeName.replace(PLACE_NAME_REGULAR, '').trim();
      }),
      catchError((error)=>{
        console.log('Error during reverse geocoding:', error);
        return of(null);
      })
    )
  }
  
}
