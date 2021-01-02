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
  profile: Utilisateur[] ;
  // @ts-ignore
  libelle: string;
  displayedColumns: string[] = ['username', 'email' , 'fisrtname', 'profilSortie', 'adresse', 'telephone', 'statut', 'groupes' ];
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
        this.profile = data[hydra];
        //console.log(this.profile);
      }
    );
  }
}
