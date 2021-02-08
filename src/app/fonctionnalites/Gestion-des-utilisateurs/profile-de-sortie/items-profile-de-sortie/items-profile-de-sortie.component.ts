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
  num = 1;
  // @ts-ignore
  totalItems: number;
  // @ts-ignore
  nombrePage: number;
  // @ts-ignore
  PnomPerPage: number;
  disableBtnP: boolean = false;
  disableBtnN: boolean = false;
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
    return this.profilSortieService.getAllProfilSortie(Number(`${this.num}`)).subscribe(
      data => {
        // @ts-ignore
        this.profileSortie = data['hydra:member'];
        // @ts-ignore
        this.totalItems = data['hydra:totalItems'];
        // @ts-ignore
        this.PnomPerPage = this.profileSortie.length;
        console.log(this.profileSortie.length);
      }
    );
  }
  // tslint:disable-next-line:typedef
  next() {
    this.num = this.num + 1;
    this.nombrePage = this.totalItems / this.PnomPerPage;
    if (this.num >= this.nombrePage) {
      this.disableBtnN = true;
      this.num = this.nombrePage;
    }
    this.disableBtnP = true;
    return this.profilSortieService.getAllProfilSortie(Number(`${this.num}`)).subscribe(data => {
      // @ts-ignore
      this.profileSortie = data['hydra:member'];
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
    return this.profilSortieService.getAllProfilSortie(Number(`${this.num}`)).subscribe(data => {
      // @ts-ignore
      this.profileSortie = data['hydra:member'];
    });
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
