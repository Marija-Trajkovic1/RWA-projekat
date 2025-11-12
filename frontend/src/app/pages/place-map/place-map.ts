import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedPlace } from '../../../store/places-store/places.selectors';
import * as maplibregl from 'maplibre-gl'
import { Subscription, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Place } from '../../models/place.model';
import { loadAttractions } from '../../../store/attractions-store/attractions.actions';
import { AttractionMarkers } from '../../components/attractions/attraction/attraction-markers.component';
import { AttractionFilter } from '../../components/attractions/attraction-filter/attraction-filter.component';
import { AttractionDetailsComponent } from '../../components/attractions/attraction-details/attraction-details-component/attraction-details-component';
import { selectAttractionDetails } from '../../../store/attraction-store/attraction.selectors';

@Component({
  selector: 'app-place-map',
  imports: [
    AttractionMarkers, 
    AttractionFilter, 
    AttractionDetailsComponent
  ],
  templateUrl: './place-map.html',
  styleUrl: './place-map.scss'
})
export class PlaceMap implements AfterViewInit, OnDestroy{
  store = inject(Store);
  private changeDetector = inject(ChangeDetectorRef);

  selectedPlace$ = this.store.select(selectSelectedPlace);
  attractionDetails$ = this.store.select(selectAttractionDetails);

  map!: maplibregl.Map;
  private sub!: Subscription;

  criteria: string[]=[];
  mapReady = false;

  constructor() {}

  ngAfterViewInit(): void {
    this.sub = this.selectedPlace$.pipe(take(1)).subscribe(place=>{
      if(!place) return;
    
      this.store.dispatch(loadAttractions({placeName: place.placeName}));
      this.initializeMap(place);
    })
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
    if(this.map) this.map.remove();
  }

  onCriteriaChange(criteria: string[]): void{
    this.criteria=criteria;
  }

  private initializeMap(place: Place): void {
    this.setInitialMap(place.longitude, place.latitude);
    this.map.on('load', ()=>{
      this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
      this.setCityMarker(place);
      this.loadMapLayers();

      this.mapReady=true;
      this.changeDetector.detectChanges();
    })
    
  }

  private setInitialMap(longitude: number, latitude: number): void {
     this.map = new maplibregl.Map({
          container: 'map',
          style: `${environment.maptilerUrl}style.json?key=${environment.maptilerApiKey}`,
          center: [longitude, latitude],
          zoom: 13,
          pitch: 60,
          bearing: -17
        });
  }

  private setCityMarker(place: Place): void {
    new maplibregl.Marker({ color: 'pink'})
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new maplibregl.Popup({offset:25}).setText(place.placeName))
        .addTo(this.map);
  }

  private loadMapLayers(): void {
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
    );
  } 
}
