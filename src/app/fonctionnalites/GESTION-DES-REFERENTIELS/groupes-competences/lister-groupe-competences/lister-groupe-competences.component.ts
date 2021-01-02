import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lister-groupe-competences',
  templateUrl: './lister-groupe-competences.component.html',
  styleUrls: ['./lister-groupe-competences.component.css']
})
export class ListerGroupeCompetencesComponent implements OnInit {
  groupeCompetence: number[] = [0, 1, 2, 3, 4, 5, 6, 8 , 9 , 10, 11, 12];
  constructor() { }

  ngOnInit(): void {
  }

}
