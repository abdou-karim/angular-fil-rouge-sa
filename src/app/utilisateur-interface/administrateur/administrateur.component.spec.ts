import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADMINISTRATEURComponent } from './administrateur.component';

describe('ADMINISTRATEURComponent', () => {
  let component: ADMINISTRATEURComponent;
  let fixture: ComponentFixture<ADMINISTRATEURComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADMINISTRATEURComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADMINISTRATEURComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
