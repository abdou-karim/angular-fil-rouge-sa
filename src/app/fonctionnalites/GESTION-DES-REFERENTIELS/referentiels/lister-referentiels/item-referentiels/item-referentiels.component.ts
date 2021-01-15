import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupeCompetence} from '../../../../../modeles';
import {Referentiels} from '../../../../../modeles/referentiels';

@Component({
  selector: 'app-item-referentiels',
  templateUrl: './item-referentiels.component.html',
  styleUrls: ['./item-referentiels.component.css']
})
export class ItemReferentielsComponent implements OnInit {
// @ts-ignore
  @Input() presentation: string;
  // @ts-ignore
  @Input() Cricteredevaluation: string;
  // @ts-ignore
  @Input() Cricteredadmission: string;
  // @ts-ignore
  @Input() libelle: string;
  // @ts-ignore
  @Input() grpcompetenceModele: Referentiels.groupeCompetence[];
  @Output() getvalueFlex = new EventEmitter<number>();
  compte = 0;
  // @ts-ignore
  valueFlex: number;
  // @ts-ignore
  background: string;
  displayedColumns: string[] = ['libelle', 'descriptif'];
  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  getValueFlex() {
    this.compte++;
    if (this.compte % 2 === 1) {
      this.valueFlex = 100;
      this.background = 'green';
    } else {
      this.valueFlex = 0;
      this.background = 'darkslateblue';
    }
    this.getvalueFlex.emit(this.valueFlex);
    console.log(this.compte % 2);
  }
}
