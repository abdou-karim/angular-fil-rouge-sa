import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaitreUtilisateurComponent } from './formulaitre-utilisateur.component';

describe('FormulaitreUtilisateurComponent', () => {
  let component: FormulaitreUtilisateurComponent;
  let fixture: ComponentFixture<FormulaitreUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaitreUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaitreUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
