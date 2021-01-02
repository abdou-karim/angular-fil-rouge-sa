import { Injectable } from '@angular/core';
import {GeneralService} from '../general/general.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Utilisateur} from '../../modeles';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient, private generalService: GeneralService ) { }
  // tslint:disable-next-line:typedef
  getAllProfile(){
    return this.generalService.getAll(`${this.API_URL}/admin/profils`);
  }
  // tslint:disable-next-line:typedef
  delete(id: number) {
    return this.generalService.delete(`${this.API_URL}/admin/profils`, Number(`${id}`));
  }
  // tslint:disable-next-line:typedef
  getProfileId(id: number): Observable<Utilisateur[]>
  {
    // @ts-ignore
    return this.generalService.getModelById<Utilisateur[]>(`${this.API_URL}/admin/profils`, `${id}`, 'users');
  }
}
