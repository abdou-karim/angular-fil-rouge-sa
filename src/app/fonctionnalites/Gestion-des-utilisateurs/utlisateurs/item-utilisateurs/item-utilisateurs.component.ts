import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../../../modeles';
import {UsersService} from '../../../../_services/users/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {newArray} from '@angular/compiler/src/util';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
// @ts-ignore
pdfMake.vsf = pdfFonts.pdfMake.vsf;
import Swal from 'sweetalert2';

/*const ELEMENT_DATA: Utilisateur[] = [
  // tslint:disable-next-line:max-line-length
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Hydrogen', email: 'sidibe@gmail.com', fisrtname: 'firstname', profile: 'admin', token: ''},
  // tslint:disable-next-line:max-line-length
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Helium', email: 'sidibe@gmail.com', fisrtname: 'firstnamee', profile: 'admin', token: ''},
  // tslint:disable-next-line:max-line-length
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Lithium', email: 'sidibe@gmail.com', fisrtname: 'firstnamei', profile: 'admin', token: ''},
  // tslint:disable-next-line:max-line-length
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Beryllium', email: 'sidibe@gmail.com', fisrtname: 'firstnamee', profile: 'formateur', token: ''},
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Boron', email: 'sidibe@gmail.com', fisrtname: 'firstname', profile: 'formateur', token: ''},
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Carbon', email: 'sidibe@gmail.com', fisrtname: 'firstname', profile: 'formateur', token: ''},
  // tslint:disable-next-line:max-line-length
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Nitrogen', email: 'sidibe@gmail.com', fisrtname: 'firstname', profile: 'formateur', token: ''},
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Oxygen', email: 'sidibe@gmail.com', fisrtname: 'firstname', profile: 'cm', token: ''},
  // tslint:disable-next-line:max-line-length
  {avatar: 'https://source.unsplash.com/108x80/?person', username: 'Fluorine', email: 'sidibe@gmail.com', fisrtname: 'firstname', profile: 'cm', token: ''},
  // tslint:disable-next-line:max-line-length
  {avatar: `https://source.unsplash.com/108x80/?person`, username: 'Neon', email: 'sidibe@gmail.com', fisrtname: 'firstnamee', profile: 'cm', token: ''},
];*/
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
    let userI ={};
    // @ts-ignore
    userI[col] = value;
    // @ts-ignore
    userI["_method"] = "PUT"
    // @ts-ignore
    this.userInfos.push(userI)
    //this.userInfos[col] = value;
    // @ts-ignore
    //let formData = new FormData();
    // @ts-ignore
    // formData.append("", JSON.stringify(this.userInfos));
    // formData.append('_method','PUT');
    return this.userService.UpdateUser([userI],Number(`${id}`))
      .subscribe(
        data => {
          console.log(data);
        }
      );

  }
  // tslint:disable-next-line:typedef
  onUpdate(id:number) {
  }
  // tslint:disable-next-line:typedef
  downloadPdf() {
    const programme = {
      content: `<div style="background:red;width:90%;height:100px">
lorem500
</div>`
    };
    // @ts-ignore
    pdfMake.createPdf(programme).download();
  }
  genereCarteEtudiant(el: Utilisateur){
    console.log(el);
    const programme = {
      content: [
        {
       html:`<div>lllll</div>`
        },
          ],
      styles:{
      }
    };
    // @ts-ignore
    pdfMake.createPdf(programme).open();
  }

}
