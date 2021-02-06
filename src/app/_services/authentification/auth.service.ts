import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utilisateur} from '../../modeles';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<Utilisateur>;
  public currentUser: Observable<Utilisateur>;
  private etatConnectionSubject = new BehaviorSubject(localStorage.getItem('etatCoonection'));
  etatCoonection = this.etatConnectionSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Utilisateur {
    return this.currentUserSubject.value;
  }
  // tslint:disable-next-line:typedef
  login(username: string, password: string) {
    return this.http.post<any>(`${this.API_URL}/login`, { username, password })
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        map(Users => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(Users));
          this.currentUserSubject.next(Users);
          return Users;
        }));
  }
  // tslint:disable-next-line:typedef
  setBoolEtatConnection(reponse: boolean)
  {
    this.etatConnectionSubject.next(String(reponse));
  }

  // tslint:disable-next-line:typedef
  logOut(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.currentUserValue.token);
    // @ts-ignore
    this.currentUserSubject.next(null);
    this.setBoolEtatConnection(false);
    this.router.navigate(['/login']);
  }
  // tslint:disable-next-line:typedef
  decodeToken(){
    const token = this.currentUserValue.token;
    const helper = new JwtHelperService();
    const decodeToken = helper.decodeToken(token);
    if (decodeToken.roles[0] === 'ROLE_Administrateur') {
      this.router.navigate(['/admin']);
    }
  }
}
