import { Injectable } from '@angular/core';
import {MenuItems, DropDownItems} from '../../modeles';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  // @ts-ignore
  private menuItems: MenuItems[] =
    [
      {
        id: 1,
        label: 'Home',
        icon: 'home',
        path: 'admin',
        showOnMobile: true,
        showOnTablet: true,
        showOnMedium: true,
        showOnDesktop: true,
        showOnLarge: true,
      },
      {
        id: 2,
        label: 'Brief',
        icon: 'assignment',
        path: '#',
        showOnMobile: false,
        showOnTablet: true,
        showOnMedium: true,
        showOnDesktop: true,
        showOnLarge: true,
      },
      {
        id: 3,
        label: 'Parametre',
        icon: 'settings',
        path: '#',
        showOnMobile: false,
        showOnTablet: false,
        showOnMedium: false,
        showOnDesktop: true,
        showOnLarge: true,
      },
      {
        id: 4,
        label: 'Rendu',
        icon: 'save_alt',
        path: '#',
        showOnMobile: false,
        showOnTablet: true,
        showOnMedium: true,
        showOnDesktop: true,
        showOnLarge: true,
      },
      {
        id: 5,
        label: 'Explorer',
        icon: 'personn',
        path: '#',
        showOnMobile: false,
        showOnTablet: false,
        showOnMedium: true,
        showOnDesktop: true,
        showOnLarge: true,
      },
      {
        id: 6,
        label: 'Forum',
        icon: 'forum',
        path: '#',
        showOnMobile: false,
        showOnTablet: false,
        showOnMedium: true,
        showOnDesktop: true,
        showOnLarge: true,
      },
      {
        id: 7,
        label: 'Users',
        icon: 'personn',
        path: '#',
        showOnMobile: false,
        showOnTablet: false,
        showOnMedium: false,
        showOnDesktop: true,
        showOnLarge: false,
      },
      {
        id: 8,
        label: 'Historique des promos',
        icon: 'update',
        path: '#',
        showOnMobile: false,
        showOnTablet: false,
        showOnMedium: false,
        showOnDesktop: true,
        showOnLarge: false,
      },
      {
        id: 9,
        label: 'LogOut',
        icon: 'settings_power',
        path: '#',
        showOnMobile: false,
        showOnTablet: false,
        showOnMedium: false,
        showOnDesktop: false,
        showOnLarge: false,
      },
    ];
  private itemDropdown: DropDownItems[] =
    [
      {
        id: 3,
        label: 'Promo',
        icon: 'layers',
        path: 'admin'
      },
      {
        id: 3,
        label: 'Referentiels',
        icon: 'book',
        path: 'liste-referentiel'
      },
      {
        id: 3,
        label: 'Grouepe de Competences ',
        icon: 'menu_book',
        path: 'lister-groupes-competences'
      },
      {
        id: 3,
        label:  'Competences ',
        icon: 'psychology',
        path: 'lister-competences'
      },
      {
        id: 3,
        label: 'Profile de Sortie',
        icon: 'how_to_reg',
        path: 'lister-profile-sortie'
      },
      {
        id: 7,
        label: 'Utilisateurs',
        icon: 'people',
        path: 'lister-utilisateurs'
      },
      {
        id: 7,
        label: 'Profiles',
        icon: 'account_circle',
        path: 'lister-profile'
      },
    ];
  constructor() { }
  // tslint:disable-next-line:typedef
  getAllMenu(){
    return this.menuItems;
  }
  // tslint:disable-next-line:typedef
  getItem(){
    return this.itemDropdown;
  }
  // tslint:disable-next-line:typedef
  getitemId(id: number){
    return this.itemDropdown.find(
      (b) => {
        // tslint:disable-next-line:triple-equals
        return b.id == id;
      }
    );
  }
}
