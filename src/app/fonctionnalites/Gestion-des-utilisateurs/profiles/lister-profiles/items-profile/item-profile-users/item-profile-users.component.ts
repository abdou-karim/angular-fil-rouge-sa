import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from '../../../../../../_services/profile/profile.service';
import {Profile, Utilisateur} from '../../../../../../modeles';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-item-profile-users',
  templateUrl: './item-profile-users.component.html',
  styleUrls: ['./item-profile-users.component.css']
})
export class ItemProfileUsersComponent implements OnInit {
  // @ts-ignore
  @Input() userIdprofile: number;
  // @ts-ignore
  @Input() libelleProfil: string;
  // @ts-ignore
  profile: Utilisateur[] ;
  // @ts-ignore
  libelle: string;
 // displayedColumns: string[] = ['username', 'email' , 'fisrtname', 'profilSortie', 'adresse', 'telephone', 'statut', 'groupes' ];
  displayedColumns: string[] = [];
  myBoll: boolean = false;
  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserProfileId();
  }
  // tslint:disable-next-line:typedef
  getUserProfileId(){
    const hydra = 'hydra:member';
    return  this.profileService.getProfileId(Number(`${this.userIdprofile}`)).subscribe(
      data => {
        // tslint:disable-next-line:no-unused-expression
        // @ts-ignore
        data[hydra].find(
          (p: Utilisateur) => {
            console.log(p);
          if(this.libelleProfil === "Administrateur" || this.libelleProfil === "Formateur" || this.libelleProfil === "Community Manager") {
            this.displayedColumns = ['username', 'email' , 'fisrtname']
          }
          else {
            this.displayedColumns = ['username', 'email' , 'fisrtname', 'profilSortie', 'adresse', 'telephone', 'statut', 'groupes']
          }
          }
        )
        // @ts-ignore
        this.profile = data[hydra];
      }
    );
  }
}
