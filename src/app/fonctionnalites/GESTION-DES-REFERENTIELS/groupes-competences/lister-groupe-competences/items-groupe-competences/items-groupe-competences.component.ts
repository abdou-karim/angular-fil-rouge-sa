import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {CompetencesService} from '../../../../../_services';
import {Competences, GroupeCompetence, Tags} from '../../../../../modeles';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-items-groupe-competences',
  templateUrl: './items-groupe-competences.component.html',
  styleUrls: ['./items-groupe-competences.component.css']
})
export class ItemsGroupeCompetencesComponent implements OnInit {
  // @ts-ignore
  @Input() competenceModele: Competences[];
  // @ts-ignore
  @Input() tagsModele: Tags[] ;
  // @ts-ignore
  @Input() Description: string;
  // @ts-ignore
  @Input() libelle: string;
  // @ts-ignore
  @Input() IdGroupeCompetence: number;
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() getGrpCompetence = new EventEmitter<boolean>();
  // @ts-ignore
  compte = 0;
  // @ts-ignore
  background: string;
  // @ts-ignore
  valueFlex: number;
  displayedColumns: string[] = ['libelle', 'descriptif'];
    require: any;
   FileSaver = require('file-saver');
  constructor(private competenceService: CompetencesService) {
  }

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
    this.newItemEvent.emit(this.valueFlex);
    console.log(this.compte % 2);
  }
  // tslint:disable-next-line:typedef
 // @ts-ignore
  // tslint:disable-next-line:typedef
  @Input() deleteGroupe(id: number){
    if (confirm('Confirmer la suppression')){
      return this.competenceService.deleteGroupeCompetenc(Number(`${id}`))
        .subscribe(
          () => {
            this.getGrpCompetence.emit(true);
          }
        );
    }
  }
  // tslint:disable-next-line:typedef
  downloadPdf() {
    const pdfUrl = './assets/sample.pdf';
    const pdfName = 'your_pdf_file';
    this.FileSaver.saveAs(pdfUrl, pdfName);
  }
}
