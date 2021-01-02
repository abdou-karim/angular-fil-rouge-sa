import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lister-referentiels',
  templateUrl: './lister-referentiels.component.html',
  styleUrls: ['./lister-referentiels.component.css']
})
export class ListerReferentielsComponent implements OnInit {

  constructor() { }
  referentiel: number[] = [0, 1, 2, 3, 4, 5, 6, 8 , 9 , 10, 11, 12];

  ngOnInit(): void {
  }

}
