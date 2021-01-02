import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeSortieComponent } from './profile-de-sortie.component';

describe('ProfileDeSortieComponent', () => {
  let component: ProfileDeSortieComponent;
  let fixture: ComponentFixture<ProfileDeSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDeSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDeSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
