import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wheretogo } from './wheretogo';

describe('Wheretogo', () => {
  let component: Wheretogo;
  let fixture: ComponentFixture<Wheretogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wheretogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wheretogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
