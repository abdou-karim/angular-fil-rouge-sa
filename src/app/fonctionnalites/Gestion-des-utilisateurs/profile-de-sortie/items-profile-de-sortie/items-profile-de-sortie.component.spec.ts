import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsProfileDeSortieComponent } from './items-profile-de-sortie.component';

describe('ItemsProfileDeSortieComponent', () => {
  let component: ItemsProfileDeSortieComponent;
  let fixture: ComponentFixture<ItemsProfileDeSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsProfileDeSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsProfileDeSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
