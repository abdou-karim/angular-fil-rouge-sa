import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {CompetencesService, ReferentielService} from '../../../../../_services';
import {GroupeCompetence} from '../../../../../modeles';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulaire-referentiel',
  templateUrl: './formulaire-referentiel.component.html',
  styleUrls: ['./formulaire-referentiel.component.css']
})
export class FormulaireReferentielComponent implements OnInit {
  selectable = true;
  selectableCe = true;
  selectableCa = true;
  removable = true;
  removableCe = true;
  removableCa = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  cicterEvaluat = new FormControl();
  cicterAdmiss = new FormControl();
  // @ts-ignore
  filteredFruits: Observable<GroupeCompetence[]>;
  // @ts-ignore
  filteredCrictereEva: Observable<string[]>;
  // @ts-ignore
  filteredCrictereAdmiss: Observable<string[]>;
  comp: string[] = [];
  Grpcomp: string[] = [];
  CricEvaluation: string[] = [];
  Cricadmission: string[] = [];
  allCompetence: string[] = [];
  allCrictereEvaluation: string[] = [];
  allCrictereAdmission: string[] = [];
  // @ts-ignore
  refForm: FormGroup;
  // @ts-ignore
  groupeComp: GroupeCompetence[];
  // @ts-ignore
  fileData: File = null;

  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('cricterEva') cricterEva: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('cricterAdm') cricterAdm: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private fb: FormBuilder, private grPCompetence: CompetencesService, private RefService: ReferentielService, private route: Router) {
  }

  ngOnInit(): void {
    this.refForm = this.fb.group({
      libelle: ['', [Validators.required]],
      presentation: ['', [Validators.required]],
      groupeCompetence: [[], [Validators.required]],
      programme: ['', [Validators.required]],
      cricterDevaluations: [[], [Validators.required]],
      cricterDadmissions: [[], [Validators.required]],
    });
    this.getGrpCompetence();
  }
    get f(){return this.refForm.controls}
  removeGrpC(fruit: string): void {
    const index = this.comp.indexOf(fruit);
    if (index >= 0) {
      this.comp.splice(index, 1);
    }
  }
  removeCriEv(fruit: string): void {
    const index = this.CricEvaluation.indexOf(fruit);
    if (index >= 0) {
      this.CricEvaluation.splice(index, 1);
    }
  }
  removeCriAd(fruit: string): void {
    const index = this.Cricadmission.indexOf(fruit);
    if (index >= 0) {
      this.Cricadmission.splice(index, 1);
    }
  }
  get GetCrictereEvalValue(){
    return this.refForm.controls.cricterDevaluations as FormArray;
  }
  get GetCrictereAdmiValue(){
    return this.refForm.controls.cricterDadmissions as FormArray;
  }
  get GetGrpCompetenceValue(){
    return this.refForm.controls.groupeCompetence as FormArray;
  }
  selectedGrpCompetence(event: MatAutocompleteSelectedEvent): void {
    this.comp.push(event.option.viewValue);
    this.Grpcomp.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
   this.GetGrpCompetenceValue.setValue(this.Grpcomp)
  }
  addCrictereEva(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.CricEvaluation.push(value.trim());
      this.GetCrictereEvalValue.setValue(this.CricEvaluation);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.cicterEvaluat.setValue(null);
  }
  addCrictereAdmission(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.Cricadmission.push(value.trim());
      this.GetCrictereAdmiValue.setValue(this.Cricadmission);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.cicterAdmiss.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCompetence.filter(grpcomp => grpcomp.toLowerCase().indexOf(filterValue) === 0);
  }
  getGrpCompetence(){
    return this.grPCompetence.getGroupeCompetence()
      .subscribe(
        data => {
          this.groupeComp = data['hydra:member'];
         data['hydra:member'].find(
           (g: GroupeCompetence) => {
             this.allCompetence.push(g.libelle)
           }
         );
        }
      );
  }
  addProgramme(programme: any){
    this.fileData = (programme.target.files[0] as File);
  }
  // tslint:disable-next-line:typedef
  addRef(){
    if(this.refForm.invalid){
      return
    }
    const formData = new FormData();
    formData.append('libelle', this.f.libelle.value);
    formData.append('presentation', this.f.presentation.value);

      formData.append('groupeCompetence',JSON.stringify(this.GetGrpCompetenceValue.value));

    formData.append('programme', this.fileData);
      formData.append('cricterDevaluations', JSON.stringify(this.GetCrictereEvalValue.value));

      formData.append('cricterDadmissions',JSON.stringify(this.Cricadmission));
   this.RefService.postReferentiel(formData).subscribe(
     () => {
       Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: 'Success',
         showConfirmButton: false,
         timer: 1500,
       })
       setTimeout(
         ()=>
         {
           this.route.navigate(['liste-referentiel'])
         },1600)

      }
    );
  }

}
