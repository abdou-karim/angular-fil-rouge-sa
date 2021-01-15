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
  constructor(private refService: ReferentielService) { }
  // @ts-ignore
  referentiel: Referentiels[];

  ngOnInit(): void {
    this.getReferentiel();
  }
// tslint:disable-next-line:typedef
getReferentiel(){
    return this.refService.getReferentiel()
      .subscribe(
        data => {
          this.referentiel = data['hydra:member'];
          console.log(this.referentiel);
        }
      );
}
  // tslint:disable-next-line:typedef
  getvalue(event: number){
    this.valueFlex = event;
  }
}
