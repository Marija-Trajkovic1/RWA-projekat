import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatCardActions } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { Store } from '@ngrx/store';
import { loadSavedAttraction, updateSavedAttractionStatus } from '../../../../../store/saved-attraction/saved-attraction.actions';
import { Observable } from 'rxjs';
import { selectSavedAttraction, selectSavedAttractionLoading } from '../../../../../store/saved-attraction/saved-attraction.selectors';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-attraction-actions-component',
  imports: [
    MatCardActions,
    MatIconButton,
    MatIcon,
    AsyncPipe
],
  templateUrl: './attraction-actions-component.html',
  styleUrl: './attraction-actions-component.scss'
})
export class AttractionActionsComponent {
  
  @Input() attractionId!: number;

  isSaved$!: Observable<boolean | null>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectSavedAttractionLoading);
    this.isSaved$ = this.store.select(selectSavedAttraction);
  }

  onUpdateSave(){
    this.store.dispatch(updateSavedAttractionStatus({attractionId: this.attractionId}));
  }

  onMarkVisited(){
    console.log('Mark visited clicked!');
  }

}
