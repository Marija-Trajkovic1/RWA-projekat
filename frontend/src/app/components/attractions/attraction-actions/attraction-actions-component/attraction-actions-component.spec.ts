import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionActionsComponent } from './attraction-actions-component';

describe('AttractionActionsComponent', () => {
  let component: AttractionActionsComponent;
  let fixture: ComponentFixture<AttractionActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
