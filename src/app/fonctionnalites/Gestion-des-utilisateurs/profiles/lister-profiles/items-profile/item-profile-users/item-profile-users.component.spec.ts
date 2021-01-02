import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProfileUsersComponent } from './item-profile-users.component';

describe('ItemProfileUsersComponent', () => {
  let component: ItemProfileUsersComponent;
  let fixture: ComponentFixture<ItemProfileUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProfileUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProfileUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
