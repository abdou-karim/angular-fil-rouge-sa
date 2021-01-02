import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Utilisateur} from '../../modeles';
import {Observable} from 'rxjs';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<Utilisateur>{

  constructor(private userService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Utilisateur> | Promise<Utilisateur> | Utilisateur {
    return this.userService.getUserId(+route.params.id);
  }
}
