import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Profile, Utilisateur} from '../../modeles';
import {Observable} from 'rxjs';
import {ProfileService} from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Utilisateur>{

  constructor(private profileService: ProfileService) { }

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Utilisateur> | Promise<Utilisateur> | Utilisateur {
    // @ts-ignore
    return this.profileService.getProfileId(`${route.paramMap.get('id')}`);
  }
}
