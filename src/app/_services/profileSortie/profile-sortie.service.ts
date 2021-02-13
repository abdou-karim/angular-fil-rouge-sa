import { Injectable } from '@angular/core';
import {GeneralService} from '../general/general.service';
import {Profile, Utilisateur} from '../../modeles';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileSortieService {
  private API_URL = environment.apiUrl;
  constructor(private gene: GeneralService,private http: HttpClient) { }
  getAllProfilSortie(value: number): Observable<Utilisateur[]>
  {
    return  this.gene.getAll(`${this.API_URL}/admin/profil_sorties?page=${value}&archivage=false`);
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    return this.gene.delete(`${this.API_URL}/admin/profil_sorties`, Number(`${id}`));
  }
  updateProfilSortie(objet:any,id: number){
    return this.http.put(`${this.API_URL}/admin/profil_sorties/${id}`,objet)
      .pipe(
        map(
          p => {
            return p;
          }
        )
      );
  }
}
