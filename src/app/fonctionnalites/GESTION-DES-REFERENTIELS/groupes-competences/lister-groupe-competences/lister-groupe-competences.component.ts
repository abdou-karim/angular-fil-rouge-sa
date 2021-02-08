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
  num = 1;
  // @ts-ignore
  totalItems: number;
  // @ts-ignore
  nombrePage: number;
  // @ts-ignore
  GpCPerPage: number;
  disableBtnP: boolean = false;
  disableBtnN: boolean = false;
  constructor(private competenceService: CompetencesService) { }

  ngOnInit(): void {
    this.getGroupeCompetence();
  }
  // tslint:disable-next-line:typedef
  getGroupeCompetence(){
    return this.competenceService.getGroupeCompetenceG(Number(`${this.num}`))
      .subscribe(
        data => {
          this.groupeCompetence = data['hydra:member'];
          // @ts-ignore
          this.totalItems = data['hydra:totalItems'];
          // @ts-ignore
          this.GpCPerPage = data['hydra:member'].length;
        }
      );
  }
  // tslint:disable-next-line:typedef
  next() {
    this.num = this.num + 1;
    this.nombrePage = this.totalItems / this.GpCPerPage;
    if (this.num >= this.nombrePage) {
      this.disableBtnN = true;
      this.num = this.nombrePage;
    }
    this.disableBtnP = true;
    return this.competenceService.getGroupeCompetenceG(Number(`${this.num}`)).subscribe(data => {
      // @ts-ignore
      this.groupeCompetence = data['hydra:member'];
    });
  }

  // tslint:disable-next-line:typedef
  preview() {
    this.num = this.num - 1;
    if (this.num <= 1) {
      this.num = 1;
      this.disableBtnP = false;
    }
    if (this.num < this.nombrePage) {
      this.disableBtnN = false;
    }
    // tslint:disable-next-line:triple-equals
    return this.competenceService.getGroupeCompetenceG(Number(`${this.num}`)).subscribe(data => {
      // @ts-ignore
      this.groupeCompetence = data['hydra:member'];
    });
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
