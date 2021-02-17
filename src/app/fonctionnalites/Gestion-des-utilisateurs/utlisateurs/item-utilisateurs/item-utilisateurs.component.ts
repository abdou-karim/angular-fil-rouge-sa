import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Utilisateur} from '../../../../modeles';
import {UsersService} from '../../../../_services/users/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {newArray} from '@angular/compiler/src/util';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
// @ts-ignore
pdfMake.vsf = pdfFonts.pdfMake.vsf;
var htmlToPdfmake = require("html-to-pdfmake");
import Swal from 'sweetalert2';
import {Format} from '@angular-devkit/build-angular/src/extract-i18n/schema';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

const USER_SCHEMA = {
  photo: 'file',
  username: 'text',
  email: 'text',
  fisrtname: 'text',
  profile: {
    libelle: 'text',
  },
};
@Component({
  selector: 'app-item-utilisateurs',
  templateUrl: './item-utilisateurs.component.html',
  styleUrls: ['./item-utilisateurs.component.css']
})
export class ItemUtilisateursComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  // @ts-ignore
  value = 'sidibe';

  displayedColumns: string[] = ['photo', 'username', 'email', 'fisrtname', 'profile', '$$edit', '$$supp', '$$liste','$$cEtudiant'];
  dataSchema = USER_SCHEMA;
  // @ts-ignore
  updateForm: FormGroup;
  //dataSource = ELEMENT_DATA;
  num = 1;
  // @ts-ignore
  totalItems: number;
  // @ts-ignore
  nombrePage: number;
  // @ts-ignore
  UserPerPage: number;
  disableBtnP: boolean = false;
  disableBtnN: boolean = false;
  users: Utilisateur [] = [];
  showdiv: boolean = false;
  // @ts-ignore
  userId: number;
  // @ts-ignore
  userInfos: string[] =[];
  tt: any;
  // @ts-ignore
  carteEbool: boolean;
  // @ts-ignore
  userCarte: Utilisateur;
  // @ts-ignore
  @ViewChild('htmData') htmData:ElementRef;
  constructor(private userService: UsersService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllUser();
    this.updateForm = this.fb.group({});
  }
  // tslint:disable-next-line:typedef
  get f(){ return this.updateForm.controls; }

  // tslint:disable-next-line:typedef
  getAllUser() {
    return this.userService.getAllUser(`${this.num}`).subscribe(
      data => {
        // @ts-ignore
        this.users = data['hydra:member'];
        // @ts-ignore
        this.totalItems = data['hydra:totalItems'];
        // @ts-ignore
        this.UserPerPage = data['hydra:member'].length;
      }
    );
  }

  // tslint:disable-next-line:typedef
  next() {
    this.num = this.num + 1;
    this.nombrePage = this.totalItems / this.UserPerPage;
    if (this.num >= this.nombrePage) {
      this.disableBtnN = true;
      this.num = this.nombrePage;
    }
    this.disableBtnP = true;
    return this.userService.getAllUser(`${this.num}`).subscribe(data => {
      // @ts-ignore
      this.users = data['hydra:member'];
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
    return this.userService.getAllUser(`${this.num}`).subscribe(data => {
      // @ts-ignore
      this.users = data['hydra:member'];
    });
  }

  // tslint:disable-next-line:typedef
  deleteUser(id: number) {
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
        this.userService.delete(Number(`${id}`)).subscribe(
          () => {
            this.getAllUser();
          }
        );
        Swal.fire(
          'Deleted!',
          'u' +
          'Utlisateur  supprimé.',
          'success'
        )
      }
    })
  }

  // tslint:disable-next-line:typedef
  getIdUser(id: number) {
    this.userId = id;
    this.showdiv = !this.showdiv;
  }
  getModif(col: any,value: string,id:number){
   let  formData = new FormData();
   formData.append(col,value);
   formData.append('_method','put');
   // console.log(formData.get(col) + " " + formData.get('_method'));
     // @ts-ignore
    return this.userService.UpdateUser(formData,Number(`${id}`))
      .subscribe(
        data => {
          this.getAllUser()
        }
      );

  }
  // tslint:disable-next-line:typedef
  onUpdate(id:number) {
  }
  genereCarteEtudiant(el: Utilisateur) {
    this.userCarte = el;
    Swal.fire({
      title: 'Voulez-vous generer la carte etudiant ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Generer`,
      denyButtonText: `afficher la carte`,
      cancelButtonText: 'annuler'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.carteEbool =true;
        let DATA = document.getElementById('htmData');
        // @ts-ignore
        html2canvas(DATA).then(canvas => {
          const FILEURI = canvas.toDataURL('application/pdf')
          let PDF = new jspdf.jsPDF();
          PDF.addImage(FILEURI, 'PDF', 0, 0, 200, 100);
          PDF.save('angular-demo.pdf');
        });
      } else if (result.isDenied) {
        this.carteEbool = true;
      }
    })

  }

  uploadFile(value: any) {
    //let fileData = value.target.files[0];
    console.log(value[0]);
    let formData = new FormData();

  }
}
