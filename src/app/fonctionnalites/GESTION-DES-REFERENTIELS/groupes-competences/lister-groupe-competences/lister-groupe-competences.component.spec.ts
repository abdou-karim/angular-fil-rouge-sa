import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerGroupeCompetencesComponent } from './lister-groupe-competences.component';

describe('ListerGroupeCompetencesComponent', () => {
  let component: ListerGroupeCompetencesComponent;
  let fixture: ComponentFixture<ListerGroupeCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerGroupeCompetencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerGroupeCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
