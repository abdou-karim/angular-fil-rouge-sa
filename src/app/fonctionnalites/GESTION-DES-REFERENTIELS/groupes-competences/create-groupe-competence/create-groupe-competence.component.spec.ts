import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupeCompetenceComponent } from './create-groupe-competence.component';

describe('CreateGroupeCompetenceComponent', () => {
  let component: CreateGroupeCompetenceComponent;
  let fixture: ComponentFixture<CreateGroupeCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupeCompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupeCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
