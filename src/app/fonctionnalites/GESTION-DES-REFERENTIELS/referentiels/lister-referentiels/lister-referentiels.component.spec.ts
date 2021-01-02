import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerReferentielsComponent } from './lister-referentiels.component';

describe('ListerReferentielsComponent', () => {
  let component: ListerReferentielsComponent;
  let fixture: ComponentFixture<ListerReferentielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerReferentielsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerReferentielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
