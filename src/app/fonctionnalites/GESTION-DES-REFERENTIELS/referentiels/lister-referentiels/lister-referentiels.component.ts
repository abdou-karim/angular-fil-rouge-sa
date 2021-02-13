import { Component, OnInit } from '@angular/core';
import {ReferentielService} from '../../../../_services';
import {Referentiels} from '../../../../modeles/referentiels';

@Component({
  selector: 'app-lister-referentiels',
  templateUrl: './lister-referentiels.component.html',
  styleUrls: ['./lister-referentiels.component.css']
})
export class ListerReferentielsComponent implements OnInit {
  // @ts-ignore
  valueFlex: number;
  constructor(private referentielService: ReferentielService) { }
  // @ts-ignore
  referentiel: Referentiels[];
  numRef = 1;
  // @ts-ignore
  totalItemsRef: number;
  // @ts-ignore
  nombrePageRef: number;
  // @ts-ignore
  RefPerPage: number;
  disableBtnP: boolean = false;
  disableBtnN: boolean = false;

  ngOnInit(): void {
    this.getReferentiel();
  }
// tslint:disable-next-line:typedef
getReferentiel(){
  return this.referentielService.getReferentielR(Number(`${this.numRef}`))
    .subscribe(
      data => {
        this.referentiel =  data['hydra:member'];
        // @ts-ignore
        this.totalItemsRef = data['hydra:totalItems'];
        // @ts-ignore
        this.RefPerPage = data['hydra:member'].length;
        console.log(this.RefPerPage);
      }
    );
}
// tslint:disable-next-line:typedef
  next() {
    this.numRef = this.numRef + 1;
    this.nombrePageRef = this.totalItemsRef / this.RefPerPage;
    if (this.numRef >= this.nombrePageRef) {
      this.disableBtnN = true;
      this.numRef = this.nombrePageRef;
    }
    this.disableBtnP = true;
    return this.referentielService.getReferentielR(Number(`${this.numRef}`)).subscribe(data => {
      // @ts-ignore
      this.referentiel = data['hydra:member'];
    });
  }

  // tslint:disable-next-line:typedef
  preview() {
    this.numRef = this.numRef - 1;
    if (this.numRef <= 1) {
      this.numRef = 1;
      this.disableBtnP = false;
    }
    if (this.numRef < this.nombrePageRef) {
      this.disableBtnN = false;
    }
    // tslint:disable-next-line:triple-equals
    return this.referentielService.getReferentielR(Number(`${this.numRef}`)).subscribe(data => {
      // @ts-ignore
      this.referentiel = data['hydra:member'];
    });
  }
  // tslint:disable-next-line:typedef
  getvalue(event: number){
    this.valueFlex = event;
  }
  getLoadRef(idRef: any){
    this.getReferentiel();
  }
}
