import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../../../../_services';
import {GroupeCompetence} from '../../../../modeles';

@Component({
  selector: 'app-lister-groupe-competences',
  templateUrl: './lister-groupe-competences.component.html',
  styleUrls: ['./lister-groupe-competences.component.css']
})
export class ListerGroupeCompetencesComponent implements OnInit {
  // @ts-ignore
  groupeCompetence: GroupeCompetence[];
  valueFlex = 0;
  constructor(private competenceService: CompetencesService) { }

  ngOnInit(): void {
    this.getGroupeCompetence();
  }
  // tslint:disable-next-line:typedef
  getGroupeCompetence(){
    return this.competenceService.getGroupeCompetence()
      .subscribe(
        data => {
          this.groupeCompetence = data['hydra:member'];
          console.log(this.groupeCompetence);
        }
      );
  }
  // tslint:disable-next-line:typedef
  getvalue(event: number){
    this.valueFlex = event;
  }
  // tslint:disable-next-line:typedef
  deleteGroupe(id: number){
    return this.competenceService.deleteGroupeCompetenc(Number(`${id}`))
      .subscribe(
        () => {
          return  this.getGroupeCompetence();
        }
      );
  }
  // tslint:disable-next-line:typedef
  getGrpCompetence(event: boolean){
    if (event){
       this.getGroupeCompetence();
    }
  }
}
