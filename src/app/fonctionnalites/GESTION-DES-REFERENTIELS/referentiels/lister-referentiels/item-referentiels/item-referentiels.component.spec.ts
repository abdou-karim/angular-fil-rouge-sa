import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReferentielsComponent } from './item-referentiels.component';

describe('ItemReferentielsComponent', () => {
  let component: ItemReferentielsComponent;
  let fixture: ComponentFixture<ItemReferentielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReferentielsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReferentielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
