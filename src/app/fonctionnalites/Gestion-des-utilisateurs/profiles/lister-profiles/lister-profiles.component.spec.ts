import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerProfilesComponent } from './lister-profiles.component';

describe('ListerProfilesComponent', () => {
  let component: ListerProfilesComponent;
  let fixture: ComponentFixture<ListerProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
