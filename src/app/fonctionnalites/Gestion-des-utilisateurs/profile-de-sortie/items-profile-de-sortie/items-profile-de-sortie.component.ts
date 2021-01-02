import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../../modeles';
import {ProfileSortieService} from '../../../../_services/profileSortie/profile-sortie.service';

/*const ELEMENT_DATA: Profile[] =
  [
    {
      libelle: 'Développeur back', delte: 'delete', update: 'update'
    },
    {
      libelle: 'Développeur front', delte: 'delete', update: 'update'
    },
    {
      libelle: 'Développeur fullstack', delte: 'delete', update: 'update'
    },
    {
      libelle: 'Intégrateur Web', delte: 'delete', update: 'update'
    },
    {
      libelle: 'Designer Web', delte: 'delete', update: 'update'
    },
    {
      libelle: 'Référent Digital', delte: 'delete', update: 'update'
    },
    {
      libelle: 'Community Manager', delte: 'delete', update: 'update'
    },
    {
      libelle: 'Data Scientist', delte: 'delete', update: 'update'
    },
    {
      libelle: 'IOT', delte: 'delete', update: 'update'
    },
  ];*/
const USER_SCHEMA = {
  libelle: 'text',
};
@Component({
  selector: 'app-items-profile-de-sortie',
  templateUrl: './items-profile-de-sortie.component.html',
  styleUrls: ['./items-profile-de-sortie.component.css']
})
export class ItemsProfileDeSortieComponent implements OnInit {
  constructor(private profilSortieService: ProfileSortieService) { }

  displayedColumns: string[] = ['libelle' , '$$edit', '$$supp'];
  //dataSource = ELEMENT_DATA;
  // @ts-ignore
  profileSortie: Profile[];
  dataSchema = USER_SCHEMA;

  ngOnInit(): void {
    this.getProfilSortie();
  }
  // tslint:disable-next-line:typedef
  getProfilSortie(){
    return this.profilSortieService.getAllProfilSortie().subscribe(
      data => {
        // @ts-ignore
        this.profileSortie = data['hydra:member'];
      }
    );
  }
  // tslint:disable-next-line:typedef
  delete(id: number){
    if (confirm('Confirmer la suppression')){
       this.profilSortieService.delete(Number(`${id}`)).subscribe(
        () => {
          this.getProfilSortie();
        }
      );
    }
  }
}
