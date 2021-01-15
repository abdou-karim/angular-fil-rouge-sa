import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompetencesService} from '../../../../../_services';
import {GroupeCompetence} from '../../../../../modeles';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-formulaire-competence',
  templateUrl: './formulaire-competence.component.html',
  styleUrls: ['./formulaire-competence.component.css']
})
export class FormulaireCompetenceComponent implements OnInit {
  // @ts-ignore
  ajoutCompetenceForm: FormGroup;
  // @ts-ignore
  niveau1: FormGroup;
  // @ts-ignore
  niveau2: FormGroup;
  // @ts-ignore
  niveau3: FormGroup;
  niveauxTabValue: string[] = [];
  niveaux = new FormArray([]);
  // @ts-ignore
  grpCompetence: GroupeCompetence[];
  constructor(private fb: FormBuilder, private competencService: CompetencesService ,private route: Router) { }

  ngOnInit(): void {
    this.getGroupeCompetence();
    this.ajoutCompetenceForm = this.fb.group({
      groupeCompetences: [[], [Validators.required]],
      libelle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      niveaux: new FormArray([], Validators.required)
    });
    this.niveau1 = this.fb.group({
      libelle: new FormControl('Niveau_1', Validators.required),
      groupeDaction: new FormControl('', Validators.required),
      crictereDevaluation: new FormControl('', Validators.required),
    });
    this.niveau2 = this.fb.group({
      libelle: new FormControl('Niveau_2', Validators.required),
      groupeDaction: new FormControl('', Validators.required),
      crictereDevaluation: new FormControl('', Validators.required),
    });
    this.niveau3 = this.fb.group({
      libelle: new FormControl('Niveau_3', Validators.required),
      groupeDaction: new FormControl('', Validators.required),
      crictereDevaluation: new FormControl('', Validators.required),
    });
    this.NiveauxControls.controls.push(this.niveau1);
    this.NiveauxControls.controls.push(this.niveau2);
    this.NiveauxControls.controls.push(this.niveau3);
    }
  // tslint:disable-next-line:typedef
  get NiveauxControls(){
    return (this.ajoutCompetenceForm.get('niveaux') as FormArray);
  }
  // tslint:disable-next-line:typedef
  get NiveauValue(){
    return this.ajoutCompetenceForm.controls.niveaux;
  }
  // tslint:disable-next-line:typedef
  addCompetence(){
    this.niveauxTabValue.push(this.niveau1.value);
    this.niveauxTabValue.push(this.niveau2.value);
    this.niveauxTabValue.push(this.niveau3.value);
    this.NiveauValue.setValue(this.niveauxTabValue);
    console.log(this.ajoutCompetenceForm.value);
    if (this.ajoutCompetenceForm.invalid){
      return;
    }
    return this.competencService.addCompetence(this.ajoutCompetenceForm.value)
      .subscribe(
        data => {
          this.ajoutCompetenceForm.reset();
          this.route.navigate(['/lister-competences']);
        }
      );
  }
  // tslint:disable-next-line:typedef
  getGroupeCompetence(){
    return this.competencService.getGroupeCompetence()
      .subscribe(
        data => {
          this.grpCompetence = data['hydra:member'];
        }
      );
  }
}
