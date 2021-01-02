import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireGroupeCompetenceComponent } from './formulaire-groupe-competence.component';

describe('FormulaireGroupeCompetenceComponent', () => {
  let component: FormulaireGroupeCompetenceComponent;
  let fixture: ComponentFixture<FormulaireGroupeCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireGroupeCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireGroupeCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
