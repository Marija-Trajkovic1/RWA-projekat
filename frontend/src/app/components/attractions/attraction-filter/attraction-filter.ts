import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAttractions } from '../../../../store/attraction-store/attractions.selectors';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-attraction-filter',
  imports: [AsyncPipe],
  templateUrl: './attraction-filter.html',
  styleUrl: './attraction-filter.scss'
})
export class AttractionFilter {
  private store = inject(Store);

  @Output() criteriaChange = new EventEmitter<string[]>();

  categories$ = this.store.select(selectAttractions).pipe(
    map(attractions => {
      const categoriesOfAttraction = new Set(attractions.map(attraction=>attraction.category));
      return Array.from(categoriesOfAttraction);
    })
  )

  selected: string[] = [];

  onToggle(category: string, checked: boolean){
    if(checked){
      this.selected.push(category);
    } else {
      this.selected = this.selected.filter(c => c !== category);
    }
    this.criteriaChange.emit(this.selected);
  }
}
