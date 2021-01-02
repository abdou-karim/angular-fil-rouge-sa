import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsProfileComponent } from './items-profile.component';

describe('ItemsProfileComponent', () => {
  let component: ItemsProfileComponent;
  let fixture: ComponentFixture<ItemsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
