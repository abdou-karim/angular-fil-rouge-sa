import { Component, OnInit } from '@angular/core';
import {MenuItems, DropDownItems} from '../../modeles';
import {NavBarService} from '../../_services';
import {Router, Routes} from '@angular/router';
import {AuthService} from '../../_services/authentification/auth.service';


@Component({
  selector: 'app-nav-bar-is-current-user',
  templateUrl: './nav-bar-is-current-user.component.html',
  styleUrls: ['./nav-bar-is-current-user.component.css']
})
export class NavBarIsCurrentUserComponent implements OnInit {
  dropmyMenu = false;
  // @ts-ignore
  menuItems: MenuItems[];
  // @ts-ignore
  menuDropdown: DropDownItems[];
  // @ts-ignore
  getNavbar: string ;
  // @ts-ignore
  appendedHtml: string ;
  constructor(private menu: NavBarService, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.getMenuItem();
  }
  // tslint:disable-next-line:typedef
  getMenuItem(){
    this.menuItems = this.menu.getAllMenu();
  }
  // tslint:disable-next-line:typedef
  getDrop(id: number){
    if (id === 9){
      this.auth.setBoolEtatConnection(false);
      this.auth.logOut();
    }
      // @ts-ignore
    if (this.menu.getitemId(`${id}`)){
      this.dropmyMenu = true;
      this.menuDropdown = this.menu.getItem().filter(
        (x) => {
          // tslint:disable-next-line:no-unused-expression triple-equals
          return  x.id == id;
        }
      );
      }else {
      this.dropmyMenu = false;
    }
  }
}
