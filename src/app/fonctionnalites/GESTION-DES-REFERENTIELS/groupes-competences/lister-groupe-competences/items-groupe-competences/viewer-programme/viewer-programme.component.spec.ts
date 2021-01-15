import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerProgrammeComponent } from './viewer-programme.component';

describe('ViewerProgrammeComponent', () => {
  let component: ViewerProgrammeComponent;
  let fixture: ComponentFixture<ViewerProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerProgrammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
