import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Crictere, GroupeCompetence} from '../../../../../modeles';
import {Referentiels} from '../../../../../modeles/referentiels';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {Router} from '@angular/router';
import {ReferentielService} from '../../../../../_services';
import {EmailValidator} from '@angular/forms';
import Swal from 'sweetalert2';
// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-item-referentiels',
  templateUrl: './item-referentiels.component.html',
  styleUrls: ['./item-referentiels.component.css']
})
export class ItemReferentielsComponent implements AfterViewInit {
  previewUrl: any = null;
// @ts-ignore
  @Input() presentation: string;
  // @ts-ignore
  @Input() Cricteredevaluation: Referentiels.cricterDevaluations[];
  // @ts-ignore
  @Input() Cricteredadmission: Referentiels.cricterDadmissions[];
  // @ts-ignore
  @Input() index: number;
  // @ts-ignore
  @Input() idRef: number;
  // @ts-ignore
  @Input() libelle: string;
  // @ts-ignore
  @Input() programme: any;
  // @ts-ignore
  @Input() grpcompetenceModele: Referentiels.groupeCompetence[];
  @Output() getvalueFlex = new EventEmitter<number>();
  // @ts-ignore
  @Output() loadRef = new EventEmitter<boolean>()
  compte = 0;
  wh = 0;
  // @ts-ignore
  myWidth: number;
  // @ts-ignore
  myHeight:number;
  // @ts-ignore
  valueFlex: number;
  // @ts-ignore
  background: string;
  displayedColumns: string[] = ['libelle', 'descriptif'];
  displayedColumns2: string[] = ['libelle'];

  constructor(private route: Router,  private refService: ReferentielService) {
  }
  ngAfterViewInit(): void {
 this.loadProgramme();
  }
  loadProgramme(){
    if (this.programme) {
      const byteArray = new Uint8Array(atob(this.programme).split('').map(char => char.charCodeAt(0)));
      const blob = new Blob([byteArray], {type: 'application/pdf'});
      if (blob){
        const url = window.URL.createObjectURL(blob);
        if (url !== null){
          // @ts-ignore
          // document.querySelector('iframe' + this.index).src = url;
          // @ts-ignore
          document.getElementById('iframe_' + this.index).setAttribute('src', url);

        }
      }
    }

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
    const programme = {contents: 'dfsdd,fdlfdfs:f:;dsds'};
    // @ts-ignore
    pdfMake.createPdf(programme).download();
  }

  ViewProgramme(programe: any) {
    let docDefinition = {
      header: 'C#Corner PDF Header',
      content: 'dddddddddddddddddddd',
      type: 'application/pdf'
    };
    // @ts-ignore
    pdfMake.createPdf(docDefinition).open();

  }
  widhtHeight(){
    this.wh++;
    this.loadProgramme();
    console.log(this.wh);
    if (this.wh % 2 ===1){
      this.myWidth = 1000;
      this.myHeight = 1000;
    }else {
      this.myWidth = 0;
      this.myHeight = 0;
    }


  }
  // @ts-ignore
  delete(idR: number){
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
        this.refService.deleteRef(Number(`${idR}`))
          .subscribe(
            () => {
              this.loadRef.emit(true);
            }

          )
        Swal.fire(
          'Deleted!',
          'u' +
          'Referentiel  supprimé.',
          'success'
        )
      }
    })

  }

}
