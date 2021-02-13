import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../../../modeles';
import {ProfileService} from '../../../../../_services/profile/profile.service';
import Swal from 'sweetalert2';


/*const ELEMENT_DATA: Profile[] =
  [
    {
      libelle: 'admin', delte: 'delete', update: 'update'
    },
    {
      libelle: 'formateur', delte: 'delete', update: 'update'
    },
    {
      libelle: 'charger de la communication', delte: 'delete', update: 'update'
    },
  ];*/
const USER_SCHEMA = {
  libelle: 'text',
};
@Component({
  selector: 'app-items-profile',
  templateUrl: './items-profile.component.html',
  styleUrls: ['./items-profile.component.css']
})
export class ItemsProfileComponent implements OnInit {
  displayedColumns: string[] = ['libelle' , '$$edit', '$$supp', '$$liste'];
  //dataSource = ELEMENT_DATA;
  // @ts-ignore
  profiles: Profile[];
  showDiv: boolean = false;
  // @ts-ignore
  profilId: number;
  myBoo = false;
  dataSchema = USER_SCHEMA;

  constructor(private profilService: ProfileService) { }

  ngOnInit(): void {
    this.getProfile();
  }
  // tslint:disable-next-line:typedef
  getProfile(){
    return this.profilService.getAllProfile().subscribe(
      data => {
        this.profiles = data['hydra:member'];
      }
    );
  }
  // tslint:disable-next-line:typedef
  deleteProfil(id: number) {
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
        this.profilService.delete(Number(`${id}`)).subscribe(
          () => {
            this.getProfile();
          }
        );
        Swal.fire(
          'Deleted!',
          'u' +
          'Profile  supprimé.',
          'success'
        )
      }
    })
  }
  // tslint:disable-next-line:typedef
  getProfilId(id: number){
    this.profilId = id;
    this.showDiv = ! this.showDiv;
  }

  getValue(id:number, value: string) {
    let Profil = {libelle: value};
    this.profilService.updateprofil(Profil,Number(`${id}`))
      .subscribe(
        () => {
        this.myBoo = true;
        }
      );
  }
  reloadP(){
    if (this.myBoo)
      this.getProfile();
  }
}
