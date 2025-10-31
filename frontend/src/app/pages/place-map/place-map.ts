import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedPlace } from '../../../store/places-store/places.selectors';

@Component({
  selector: 'app-place-map',
  imports: [],
  templateUrl: './place-map.html',
  styleUrl: './place-map.scss'
})
export class PlaceMap {
  private store = inject(Store);

  selectedPlace$ = this.store.select(selectSelectedPlace);
}
