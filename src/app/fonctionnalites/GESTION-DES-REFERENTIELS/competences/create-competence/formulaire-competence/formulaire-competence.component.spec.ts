import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCompetenceComponent } from './formulaire-competence.component';

describe('FormulaireCompetenceComponent', () => {
  let component: FormulaireCompetenceComponent;
  let fixture: ComponentFixture<FormulaireCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
