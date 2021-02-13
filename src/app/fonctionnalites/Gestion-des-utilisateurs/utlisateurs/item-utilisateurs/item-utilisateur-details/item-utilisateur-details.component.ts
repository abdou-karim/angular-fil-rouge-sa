import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../../../../_services/users/users.service';
import {Utilisateur} from '../../../../../modeles';

@Component({
  selector: 'app-item-utilisateur-details',
  templateUrl: './item-utilisateur-details.component.html',
  styleUrls: ['./item-utilisateur-details.component.css']
})
export class ItemUtilisateurDetailsComponent implements OnInit {

  constructor(private userService: UsersService) { }
  // @ts-ignore
  @Input() IdUser: number;
  // @ts-ignore
  user: Utilisateur[] ;
  groupe: any;
  displayedColumns: string[] = ['profile', 'profilSortie', 'genre', 'adresse', 'telephone', 'statut', 'groupe' ];
  ngOnInit(): void {
    this.getUserId();
  }
  // tslint:disable-next-line:typedef
  getUserId(){
    return  this.userService.getUserId(Number(`${this.IdUser}`)).subscribe(
      data => {
        this.user = [data] ;
       // console.log(this.user);
      }
    );
  }

}
