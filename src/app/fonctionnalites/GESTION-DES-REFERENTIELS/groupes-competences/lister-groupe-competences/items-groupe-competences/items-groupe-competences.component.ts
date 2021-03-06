import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {CompetencesService} from '../../../../../_services';
import {Competences, GroupeCompetence, Tags} from '../../../../../modeles';
import {Observable} from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import Swal from 'sweetalert2';
// @ts-ignore
pdfMake.vsf = pdfFonts.pdfMake.vsf;

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
  @Input() referentiel: any;
  // @ts-ignore
  @Input() IdGroupeCompetence: number;
  @Output() newItemEvent = new EventEmitter<number>();
  // @ts-ignore
  @Output() getGrpCompetenceRef = new EventEmitter<GroupeCompetence>();
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
      this.background = '#3f51b5';
    }
    this.newItemEvent.emit(this.valueFlex);
    console.log(this.compte % 2);
  }
  // tslint:disable-next-line:typedef
 // @ts-ignore
  // tslint:disable-next-line:typedef
  @Input() deleteGroupe(id: number){
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.competenceService.deleteGroupeCompetenc(Number(`${id}`))
          .subscribe(
            () => {
              this.getGrpCompetence.emit(true);
            }
          );
        Swal.fire(
          'Deleted!',
          'u' +
          'Groupe Commpetence  supprimé.',
          'success'
        )
      }
    })
  }
  sendIdGroupeCompetence(id: number){
    return this.competenceService.getGrpCompetenceById(id)
      .subscribe(
        data => {
          console.log(data);
        }
      )
  }
}
