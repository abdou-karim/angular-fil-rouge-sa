import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUtilisateurDetailsComponent } from './item-utilisateur-details.component';

describe('ItemUtilisateurDetailsComponent', () => {
  let component: ItemUtilisateurDetailsComponent;
  let fixture: ComponentFixture<ItemUtilisateurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemUtilisateurDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUtilisateurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
