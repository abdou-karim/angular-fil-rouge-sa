import { Injectable } from '@angular/core';
import {GeneralService} from '../general/general.service';
import {environment} from '../../../environments/environment';
import {Competences} from '../../modeles';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GroupeCompetence} from '../../modeles';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {
  private API_URL = environment.apiUrl;

  private competenceOk = new BehaviorSubject(false);
  etatCompetence = this.competenceOk.asObservable();
  constructor(private geneService: GeneralService, private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // tslint:disable-next-line:typedef
  setCompetenceEta(etat: boolean){
    this.competenceOk.next(etat);
  }
  getCompetences(): Observable<Competences[]>
  {
    return this.geneService.getAll(`${this.API_URL}/admin/competences`);
  }

  // tslint:disable-next-line:typedef
  getGroupeCompetence(){
    return this.geneService.getAll(`${this.API_URL}/admin/groupe_competences?archivage=false`);
  }
  // tslint:disable-next-line:typedef
  getGroupeCompetenceG(value:number){
    return this.geneService.getAll(`${this.API_URL}/admin/groupe_competences?page=${value}&archivage=false`);
  }
  // tslint:disable-next-line:typedef
  addGroupeCompetence(grpCompetence: GroupeCompetence): Observable<GroupeCompetence>
  {
    return this.http.post<GroupeCompetence>(`${this.API_URL}/admin/groupe_competences`, grpCompetence, this.httpOptions)
      .pipe(
        map(
          data => {
            console.log(data);
            return data;
          }
        )
      );
  }
  addCompetence(competence: Competences): Observable<Competences>
  {
    return this.http.post<Competences>(`${this.API_URL}/admin/competences`, competence, this.httpOptions)
      .pipe(
        map(
          data => {
            console.log(data);
            return data;
          }
        )
      );
  }
  // tslint:disable-next-line:typedef
  deleteGroupeCompetenc(id: number) {
    return this.geneService.delete(`${this.API_URL}/admin/groupe_competences`, Number(`${id}`));
  }
  // tslint:disable-next-line:typedef
  getGrpCompetenceById(id: number): Observable<GroupeCompetence[]>{
    return this.geneService.getModelById(`${this.API_URL}/admin/groupe_competences`, Number(`${id}`));
  }
}
