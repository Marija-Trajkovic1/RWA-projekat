import { Component, inject, Input } from '@angular/core';
import { MatCardActions } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { Store } from '@ngrx/store';
import { updateSavedAttractionStatus } from '../../../../../store/saved-attraction/saved-attraction.actions';
import { Observable } from 'rxjs';
import { selectSavedAttraction, selectSavedAttractionLoading } from '../../../../../store/saved-attraction/saved-attraction.selectors';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { selectIsVisited, selectVisitedAttractionLoading } from '../../../../../store/visited-attraction/visited-attraction.selector';
import { loadAverageRating, updateVisitedAttraction } from '../../../../../store/visited-attraction/visited-attraction.actions';
import { MatDialog } from '@angular/material/dialog';
import { AttractionRatingComponent } from '../../attraction-rating/attraction-rating-component/attraction-rating-component';

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

  private store= inject(Store);
  private dialog = inject(MatDialog);

  isSaved$!: Observable<boolean | null>;
  isVisited$!: Observable<boolean | null>;
  loadingIsSaved$!: Observable<boolean>;
  loadingIsVisited$!: Observable<boolean>;

  constructor() {
    this.loadingIsSaved$ = this.store.select(selectSavedAttractionLoading);
    this.isSaved$ = this.store.select(selectSavedAttraction);
    this.loadingIsVisited$ = this.store.select(selectVisitedAttractionLoading);
    this.isVisited$ = this.store.select(selectIsVisited);
  }

  onUpdateSave(){
    this.store.dispatch(updateSavedAttractionStatus({attractionId: this.attractionId}));
  }

  onMarkVisited(){
    const dialogRef= this.dialog.open(AttractionRatingComponent,{
      data: {attractionId: this.attractionId}
    });
    dialogRef.afterClosed().subscribe((rating: number | null)=>{
      if(rating !== null) {
        this.store.dispatch(updateVisitedAttraction({attractionId: this.attractionId, rating}));

        this.store.dispatch(loadAverageRating({attractionId: this.attractionId}));
      }
    })
  }

}
