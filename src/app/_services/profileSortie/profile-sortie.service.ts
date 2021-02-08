import { Injectable } from '@angular/core';
import {GeneralService} from '../general/general.service';
import {Profile, Utilisateur} from '../../modeles';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileSortieService {
  private API_URL = environment.apiUrl;
  constructor(private gene: GeneralService) { }
  getAllProfilSortie(value: number): Observable<Utilisateur[]>
  {
    return  this.gene.getAll(`${this.API_URL}/admin/profil_sorties?page=${value}&archivage=false`);
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    return this.gene.delete(`${this.API_URL}/admin/profil_sorties`, Number(`${id}`));
  }
}
