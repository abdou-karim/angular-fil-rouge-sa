import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarIsCurrentUserComponent } from './nav-bar-is-current-user.component';

describe('NavBarIsCurrentUserComponent', () => {
  let component: NavBarIsCurrentUserComponent;
  let fixture: ComponentFixture<NavBarIsCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarIsCurrentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarIsCurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
