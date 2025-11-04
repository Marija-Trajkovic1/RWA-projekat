import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedPlace } from '../../../store/places-store/places.selectors';
import * as maplibregl from 'maplibre-gl'
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-place-map',
  imports: [],
  templateUrl: './place-map.html',
  styleUrl: './place-map.scss'
})
export class PlaceMap implements AfterViewInit, OnDestroy{
  private store = inject(Store);

  selectedPlace$ = this.store.select(selectSelectedPlace);

  private map!: maplibregl.Map;
  private sub!: Subscription;

  constructor() {}

  ngAfterViewInit(): void {
    this.sub = this.selectedPlace$.subscribe(place=>{
      if(place){
        this.map = new maplibregl.Map({
          container: 'map',
          style: `https://api.maptiler.com/maps/streets/style.json?key=${environment.maptilerApiKey}`,
          center: [place.latitude, place.longitude],
          zoom: 13
        });

        new maplibregl.Marker({ color: 'blue'})
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new maplibregl.Popup({offset:25}).setText(place.placeName))
        .addTo(this.map);

       
      }
    })
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
    if(this.map) this.map.remove();
  }
  
}
