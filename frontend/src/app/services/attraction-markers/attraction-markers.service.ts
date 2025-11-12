import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AttractionSummary } from '../../models/attraction.model';
import { IMPORTANT, MAX_DISTANCE } from '../../constants/attractions.constants';
import { calculateHaversineDistance } from '../../utils/haversine.util';

@Injectable({
  providedIn: 'root'
})
export class AttractionMarkersService {
  constructor(private store: Store) {}

  filterAttractions(
    attractions: AttractionSummary[],
    criteria: string[],
    zoom: number,
    center: {lng: number; lat:number}
  ): AttractionSummary[] {
    if(zoom< 14) return [];

    const alwaysVisible = attractions.filter(a=>a.category === IMPORTANT);
    let filtered = attractions;

    if(criteria.length> 0){
      filtered=filtered.filter(a=>criteria.includes(a.category));
    }

    const combined = [...new Set([...filtered, ...alwaysVisible])];

    return combined.filter(attraction=>{
      const distance = calculateHaversineDistance(
        [center.lng, center.lat],
        [attraction.longitude, attraction.latitude]
      );
      return distance <= MAX_DISTANCE;
    })
  }
}
