import { Component } from '@angular/core';
import {NavBarService} from './_services';
import {AuthService} from './_services/authentification/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ts-ignore
  navBoll: boolean;
  // @ts-ignore
  etatConnection: string;
  title = 'angular-fil-rouge-sa';
  constructor(private authService: AuthService) {
    this.authService.etatCoonection.subscribe(
      data => {
        if (data != null) {
          localStorage.setItem('etatCoonection', data);
        }else {
          localStorage.setItem('etatCoonection', String(false));
        }
        // @ts-ignore
        this.etatConnection = localStorage.getItem('etatCoonection');
        console.log(this.etatConnection);
      }
    );
  }
}
