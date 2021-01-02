import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../../../modeles';
import {ProfileService} from '../../../../../_services/profile/profile.service';


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
    if (confirm('Confirmer la suppression')) {
      this.profilService.delete(Number(`${id}`)).subscribe(
        () => {
          this.getProfile();
        }
      );
    }
  }
  // tslint:disable-next-line:typedef
  getProfilId(id: number){
    this.profilId = id;
    this.showDiv = ! this.showDiv;
  }
}
