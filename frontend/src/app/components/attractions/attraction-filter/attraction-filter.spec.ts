import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionFilter } from './attraction-filter';

describe('AttractionFilter', () => {
  let component: AttractionFilter;
  let fixture: ComponentFixture<AttractionFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
