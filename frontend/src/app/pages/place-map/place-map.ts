import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedPlace } from '../../../store/places-store/places.selectors';
import * as maplibregl from 'maplibre-gl'
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Place } from '../../../models/place.model';

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
        this.setInitalMap(place.longitude, place.latitude);

        this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

        this.setCityMarker(place);

       this.loadMapLayers();
       
      }
    })
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
    if(this.map) this.map.remove();
  }

  setInitalMap(longitude: number, latitude: number): void {
     this.map = new maplibregl.Map({
          container: 'map',
          style: `${environment.maptilerUrl}style.json?key=${environment.maptilerApiKey}`,
          center: [longitude, latitude],
          zoom: 13,
          pitch: 60,
          bearing: -17
        });
  }

  setCityMarker(place: Place): void {
    new maplibregl.Marker({ color: 'pink'})
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new maplibregl.Popup({offset:25}).setText(place.placeName))
        .addTo(this.map);
  }

  loadMapLayers(): void {
    this.map.on('load', ()=>{
      const layers = this.map.getStyle().layers!;
        let labelLayerId: string | undefined;

        for(const layer of layers){
            if(layer.type==='symbol' && layer.layout && layer.layout['text-field']){
              labelLayerId = layer.id;
              break;
            }
        }

        this.map.addLayer(
            {
              id: '3d-buildings',
              source: 'openmaptiles', 
              'source-layer': 'building',
              filter: ['!', ['to-boolean', ['get','hide-3d']]],
              type: 'fill-extrusion',
              minzoom: 13,
              paint :{
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  13, 0,
                  14, ['get', 'render_height'],
                  16, ['get', 'render_height']
                ],
                'fill-extrusion-base': [
                  'case',
                  ['>=', ['get', 'zoom'], 16],
                  ['get', 'render_min_height'],
                  0
                ],
                'fill-extrusion-opacity': 0.5
              }
            },
            labelLayerId
        )
    });
  } 
}
