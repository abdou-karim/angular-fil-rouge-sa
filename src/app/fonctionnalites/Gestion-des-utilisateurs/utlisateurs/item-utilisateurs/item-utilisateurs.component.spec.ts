import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUtilisateursComponent } from './item-utilisateurs.component';

describe('ItemUtilisateursComponent', () => {
  let component: ItemUtilisateursComponent;
  let fixture: ComponentFixture<ItemUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemUtilisateursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
