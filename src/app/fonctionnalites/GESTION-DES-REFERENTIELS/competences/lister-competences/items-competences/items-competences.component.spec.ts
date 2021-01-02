import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsCompetencesComponent } from './items-competences.component';

describe('ItemsCompetencesComponent', () => {
  let component: ItemsCompetencesComponent;
  let fixture: ComponentFixture<ItemsCompetencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsCompetencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
