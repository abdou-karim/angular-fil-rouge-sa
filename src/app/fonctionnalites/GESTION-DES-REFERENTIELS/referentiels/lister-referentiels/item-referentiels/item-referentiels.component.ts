import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Crictere, GroupeCompetence} from '../../../../../modeles';
import {Referentiels} from '../../../../../modeles/referentiels';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {Router} from '@angular/router';
// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-item-referentiels',
  templateUrl: './item-referentiels.component.html',
  styleUrls: ['./item-referentiels.component.css']
})
export class ItemReferentielsComponent implements OnInit {
  previewUrl: any = null;
// @ts-ignore
  @Input() presentation: string;
  // @ts-ignore
  @Input() Cricteredevaluation: Referentiels.cricterDevaluations[];
  // @ts-ignore
  @Input() Cricteredadmission: Referentiels.cricterDadmissions[];
  // @ts-ignore
  @Input() libelle: string;
  // @ts-ignore
  @Input() programme: any;
  // @ts-ignore
  @Input() grpcompetenceModele: Referentiels.groupeCompetence[];
  @Output() getvalueFlex = new EventEmitter<number>();
  compte = 0;
  // @ts-ignore
  valueFlex: number;
  // @ts-ignore
  background: string;
  displayedColumns: string[] = ['libelle', 'descriptif'];
  displayedColumns2: string[] = ['libelle'];
  constructor(private route: Router) { }

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
      this.background = '#3f51b5';
    }
    this.getvalueFlex.emit(this.valueFlex);
    console.log(this.compte % 2);
  }
  // tslint:disable-next-line:typedef
  downloadPdf() {
    const programme = { contents: 'dfsdd,fdlfdfs:f:;dsds'};
    // @ts-ignore
    pdfMake.createPdf(programme).download();
  }
  ViewProgramme(programe: any){
    let docDefinition = {
      header: 'C#Corner PDF Header',
      content: 'dddddddddddddddddddd',
      type: 'application/pdf'
    };
    // @ts-ignore
    pdfMake.createPdf(docDefinition).open();

  }

}
