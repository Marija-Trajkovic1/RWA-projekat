import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAttractionDetails } from '../../../../../store/attraction-store/attraction.selectors';
import { AttractionDetails } from '../../../../models/attraction.model';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle  } from '@angular/material/card';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { clearAttractionDetails } from '../../../../../store/attraction-store/attraction.actions';

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
    MatIcon
],
  templateUrl: './attraction-details-component.html',
  styleUrl: './attraction-details-component.scss'
})
export class AttractionDetailsComponent {
  private store = inject(Store);
  attractionDetails$ : Observable<AttractionDetails|null>;

  constructor(){
    this.attractionDetails$ = this.store.select(selectAttractionDetails);
  }

  closeDetails(){
    this.store.dispatch(clearAttractionDetails());
  }
}
