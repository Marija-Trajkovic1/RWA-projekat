import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, startWith, Subject, takeUntil } from 'rxjs';
import { selectAttractions } from '../../../../store/attractions-store/attractions.selectors';
import { CATEGORY_COLORS, CATEGORY_ICONS, IMPORTANT } from '../../../constants/attractions.constants';
import { AttractionSummary } from '../../../models/attraction.model';
import maplibregl from 'maplibre-gl';
import { loadAttractionDetails } from '../../../../store/attraction-store/attraction.actions';

@Component({
  selector: 'app-attraction',
  imports: [],
  templateUrl: './attraction-markers.component.html',
  styleUrl: './attraction-markers.component.scss'
})
export class AttractionMarkers implements OnInit, OnDestroy{
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  @Input() map!: maplibregl.Map;
  @Input() criteria: string[] = [];

  private attractionMarkers: maplibregl.Marker[]=[];

  constructor() {}

  ngOnInit(): void {
    if(!this.map) return;
    const attractions$ = this.store.select(selectAttractions);
    const zoom$ = fromEvent(this.map, 'zoom').pipe(
      startWith(this.map.getZoom()),
      map(()=> this.map.getZoom()),
      distinctUntilChanged()
    );

    const center$ = fromEvent(this.map, 'move').pipe(
      startWith(this.map.getCenter()),
      map(()=>this.map.getCenter())
    );

    combineLatest([attractions$, zoom$, center$])
    .pipe(
      debounceTime(150),
      map(([attractions, zoom, center]) => {
        if(zoom<14) return [];
        const alwaysVisibleAttractions = attractions.filter(attraction=> attraction.category === IMPORTANT);
        let filteredAttractionsByCriteria = attractions;
        if(this.criteria.length>0){
          filteredAttractionsByCriteria = filteredAttractionsByCriteria.filter(attraction=>this.criteria.includes(attraction.category));
        }
        const combinedAttractions =[...new Set([...filteredAttractionsByCriteria, ...alwaysVisibleAttractions])];
        return combinedAttractions.filter(attraction => {
          const distance = this.calculateDistance(
            [center.lng, center.lat],
            [attraction.longitude, attraction.latitude]
          );
          return distance<=1;
        })
      }),
      takeUntil(this.destroy$)
    ).subscribe(filteredAttractions => {
      this.updateMarkers(filteredAttractions);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearMarkers();
  }

  private updateMarkers(attractions: AttractionSummary[]): void {
    const existingIds = new Set(this.attractionMarkers.map(marker=>marker.getElement().dataset['id']));
    const newIds = new Set(attractions.map(attraction=>attraction.id.toString()));

    this.attractionMarkers=this.attractionMarkers.filter(marker => {
      const id = marker.getElement().dataset['id'];
      if(!newIds.has(id!)) {
        marker.remove();
        return false;
      }
      return true;
    });

    attractions.forEach(attraction=>{
      if(!existingIds.has(attraction.id.toString())){
        const markerEmement = this.createMarkerElement(attraction.category);
        markerEmement.dataset['id'] = attraction.id.toString();
        const marker = new maplibregl.Marker({element: markerEmement})
          .setLngLat([attraction.longitude, attraction.latitude])
          .addTo(this.map);
        const namePopup = new maplibregl.Popup({offset: 25})
          .setHTML(`<strong>${attraction.attractionName}</strong>`);
        const element = marker.getElement();
        element.addEventListener('mouseenter', ()=>{
          namePopup.setLngLat([attraction.longitude, attraction.latitude]).addTo(this.map);
        });
        element.addEventListener('mouseleave',()=>{
          namePopup.remove();
        });

        element.addEventListener('click', ()=>{
          this.store.dispatch(loadAttractionDetails({id: attraction.id}));  
        });
        
        this.attractionMarkers.push(marker);
      }
    })
  }

  private createMarkerElement(category: string): HTMLElement {
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.width = '40px';
    markerElement.style.height = '40px';
    markerElement.style.border = `2px solid ${CATEGORY_COLORS[category] || '#FF7F50'}`;
    markerElement.style.backgroundImage = `url(${CATEGORY_ICONS[category]})`;
    markerElement.style.backgroundSize = '70%';
    markerElement.style.backgroundPosition = 'center';
    markerElement.style.backgroundRepeat = 'no-repeat';
    markerElement.style.borderRadius = '50%';
    markerElement.style.boxShadow = '0 0 6px rgba(0, 0, 0, 0.3)';
    return markerElement;
  }

  private clearMarkers():void{
    this.attractionMarkers.forEach(marker => marker.remove());
    this.attractionMarkers=[];
  }

  private calculateDistance(coord1: [number, number], coord2:[number, number]): number {
    const earthRadiusInKm = 6371;
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const deltaLatitude = this.toRad(lat2-lat1);
    const deltaLongitude = this.toRad(lon2-lon1);
    const haversineOfCentralAngle = Math.sin(deltaLatitude/2)*Math.sin(deltaLatitude / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);
    const centralAngle =2 * Math.atan2(Math.sqrt(haversineOfCentralAngle), Math.sqrt(1-haversineOfCentralAngle));
    return earthRadiusInKm*centralAngle;
  }

  private toRad(value: number): number {
    return (value*Math.PI) /180;
  }
}
