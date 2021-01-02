import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireReferentielComponent } from './formulaire-referentiel.component';

describe('FormulaireReferentielComponent', () => {
  let component: FormulaireReferentielComponent;
  let fixture: ComponentFixture<FormulaireReferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireReferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireReferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
