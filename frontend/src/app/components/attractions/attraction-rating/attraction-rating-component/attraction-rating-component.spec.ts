import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionRatingComponent } from './attraction-rating-component';

describe('AttractionRatingComponent', () => {
  let component: AttractionRatingComponent;
  let fixture: ComponentFixture<AttractionRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
