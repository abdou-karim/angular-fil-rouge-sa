import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../../../../_services';
import {Competences, GroupeCompetence, Niveaux} from '../../../../../modeles';

@Component({
  selector: 'app-items-competences',
  templateUrl: './items-competences.component.html',
  styleUrls: ['./items-competences.component.css']
})
export class ItemsCompetencesComponent implements OnInit {
// @ts-ignore
   grpCompetence: GroupeCompetence[];
   // @ts-ignore
  grpCompetencew: GroupeCompetence[];
   // @ts-ignore
  competence: Competences[];
  // @ts-ignore
  niveau: Niveaux[];
  // @ts-ignore
  crictereDevaluation: string;
  // @ts-ignore
  groupeDaction: string;
  monBol = false;
  // @ts-ignore
  competenceOk: boolean;
  constructor(private competenceService: CompetencesService) {
    this.competenceService.etatCompetence.subscribe(
      data => {
        this.competenceOk = data;
      }
    );
  }

  ngOnInit(): void {
    this.getGrcompetence();
  }
  // tslint:disable-next-line:typedef
  getGrcompetence(){
      return this.competenceService.getGroupeCompetence()
        .subscribe(
          data => {
            this.grpCompetence = data['hydra:member'];
            if (this.competenceOk){
           this.getGrcompetence();
         }
          }
        );
  }
  // tslint:disable-next-line:typedef
  getMyGroupeCompetence(cometence: any){
   this.competence =  cometence;
  }
  // tslint:disable-next-line:typedef
  getNiveau(niveau: any, mybol: boolean){
    mybol = true;
    this.monBol = mybol;
    console.log(this.monBol);
    this.niveau = niveau;
  }
  // tslint:disable-next-line:typedef
  getCrictere(cricterDaction: any, groupeDaction: any){
    console.log(cricterDaction);
    this.crictereDevaluation = cricterDaction;
    this.groupeDaction = groupeDaction;

  }

  // tslint:disable-next-line:typedef
    getGrpComptenceId(){
        return this.competenceService.getGrpCompetenceById(Number(`${1}`))
          .subscribe(
            data => {
              this.grpCompetencew = data;
              console.log(this.grpCompetencew);
            }
          );
      }
}
