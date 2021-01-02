import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../../../modeles';
import {UsersService} from '../../../../_services/users/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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

  displayedColumns: string[] = ['photo', 'username', 'email', 'fisrtname', 'profile', '$$edit', '$$supp', '$$liste'];
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
        console.log(this.users);
      }
    );
  }

  // tslint:disable-next-line:typedef
  next() {
    this.num = this.num + 1;
    this.nombrePage = this.totalItems / this.UserPerPage;
    if (this.num >= this.nombrePage - 1) {
      this.disableBtnN = true;
      this.num = this.nombrePage - 1;
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
    if (this.num < this.nombrePage - 1) {
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
    if (confirm('Confirmer la suppression')) {
      this.userService.delete(Number(`${id}`)).subscribe(
        () => {
          this.getAllUser();
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  getIdUser(id: number) {
    this.userId = id;
    this.showdiv = !this.showdiv;
  }
  // tslint:disable-next-line:typedef
  onUpdate(element: HTMLFormElement){
    console.log(element);
  }
  // tslint:disable-next-line:typedef
  onKey(event: any){
    console.log( event);
  }
}
