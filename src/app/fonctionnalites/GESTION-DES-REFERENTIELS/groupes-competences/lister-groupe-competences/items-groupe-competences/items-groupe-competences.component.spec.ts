import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsGroupeCompetencesComponent } from './items-groupe-competences.component';

describe('ItemsGroupeCompetencesComponent', () => {
  let component: ItemsGroupeCompetencesComponent;
  let fixture: ComponentFixture<ItemsGroupeCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsGroupeCompetencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsGroupeCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
