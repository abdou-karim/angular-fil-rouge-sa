import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css']
})
export class CreatePromotionComponent implements OnInit {

  constructor() { }
  // @ts-ignore
  myForm: FormGroup;
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  uploadFile(evt){
// evt est un tableau des fichier(s) déposés sur notre div. Ici nous supposerons qu'il y a un seul fichier uploadé
    console.log(evt);
    const payload = new FormData();
    payload.append('data', evt[0]);
    // Nous pouvons maintenant uploader le fichier en lancant une requete POST avec la variable payload comme corps de requete :)
  }
  // tslint:disable-next-line:typedef
  onCreate(){
  }
}
