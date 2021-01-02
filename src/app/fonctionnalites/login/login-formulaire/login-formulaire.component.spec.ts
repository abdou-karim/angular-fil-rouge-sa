import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormulaireComponent } from './login-formulaire.component';

describe('LoginFormulaireComponent', () => {
  let component: LoginFormulaireComponent;
  let fixture: ComponentFixture<LoginFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormulaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
