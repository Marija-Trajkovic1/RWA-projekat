import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, tap } from 'rxjs';
import { selectAttractionDetails } from '../../../../../store/attraction-store/attraction.selectors';
import { AttractionDetails } from '../../../../models/attraction.model';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle  } from '@angular/material/card';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { clearAttractionDetails } from '../../../../../store/attraction-store/attraction.actions';
import { AttractionActionsComponent } from "../../attraction-actions/attraction-actions-component/attraction-actions-component";
import { loadSavedAttraction } from '../../../../../store/saved-attraction/saved-attraction.actions';

@Component({
  selector: 'app-attraction-details-component',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    AsyncPipe,
    MatCardContent,
    MatCardSubtitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIconButton,
    MatIcon,
    AttractionActionsComponent
],
  templateUrl: './attraction-details-component.html',
  styleUrl: './attraction-details-component.scss'
})
export class AttractionDetailsComponent implements OnInit{
  private store = inject(Store);
  attractionDetails$! : Observable<AttractionDetails|null>;

  constructor(){}

  ngOnInit(){
    this.attractionDetails$ = this.store.select(selectAttractionDetails).pipe(
      tap(attraction => {
        if (attraction?.id) {
          this.store.dispatch(loadSavedAttraction({ attractionId: attraction.id }));
        }
      })
    );
  }

  closeDetails(){
    console.log('Closed');
    this.store.dispatch(clearAttractionDetails());
  }
}
