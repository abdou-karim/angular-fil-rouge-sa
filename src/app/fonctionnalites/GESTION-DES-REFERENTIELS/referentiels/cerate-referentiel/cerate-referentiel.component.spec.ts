import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerateReferentielComponent } from './cerate-referentiel.component';

describe('CerateReferentielComponent', () => {
  let component: CerateReferentielComponent;
  let fixture: ComponentFixture<CerateReferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerateReferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CerateReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
