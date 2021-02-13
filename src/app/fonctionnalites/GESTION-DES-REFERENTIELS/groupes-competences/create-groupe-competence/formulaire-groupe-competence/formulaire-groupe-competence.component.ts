import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {first, map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {CompetencesService, TagsService} from '../../../../../_services';
import {Competences, Tags} from '../../../../../modeles';
import {GroupeCompetence} from '../../../../../modeles';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Tag} from 'primeng/tag';
import {ActivatedRoute, Router} from '@angular/router';
import {log} from 'util';


@Component({
  selector: 'app-formulaire-groupe-competence',
  templateUrl: './formulaire-groupe-competence.component.html',
  styleUrls: ['./formulaire-groupe-competence.component.css']
})
export class FormulaireGroupeCompetenceComponent implements OnInit{
  // @ts-ignore
  valueBtn = "Soumettre";
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  competenceCtrl = new FormControl();
  // @ts-ignore
  filteredCompetences: Observable<Competences[]>;
  tabCompetence: string[] = [];
  tabCompetenceValue: string[] = [];
  tabTagValue: string[] = [];
  allCompetence: string[] = [];
  // @ts-ignore
  idTags: number;
  // @ts-ignore
  competences: Competences[] ;
  // @ts-ignore
  tagsModele: Tags[];
  // @ts-ignore
  addGroupeCompetenceForm: FormGroup;
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource: any;
  selection = new SelectionModel<Tags>(true, []);
   tags = new FormControl();
  isAddMode!: boolean;
   // @ts-ignore
  myId: number;
  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private competenceService: CompetencesService,
              private fb: FormBuilder, private tagService: TagsService, private route: ActivatedRoute, private router: Router,) {
    this.getCompetenceChips();
    this.getTag();
     }
  ngOnInit(): void {
    this.addGroupeCompetenceForm = this.fb.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      competence: [[], Validators.required],
      tags: [[]]
    });
    this.myId = this.route.snapshot.params['id'];
    this.isAddMode = !this.myId;
    this.getComppetences();
    this.competenceCtrlfc.setValue(this.tabCompetenceValue);
    if(!this.isAddMode){
      this.valueBtn = "Modifier"
      this.competenceService.getGrpCompetenceById(Number(`${this.myId}`))
        .pipe(first())
        .subscribe(x => {
          console.log(x);
          this.addGroupeCompetenceForm.patchValue(x);
        });
    }

  }
  // tslint:disable-next-line:typedef
  get competenceCtrlfc() {
    return this.addGroupeCompetenceForm.controls.competence;
  }
  // tslint:disable-next-line:typedef
  get tagsValue(){
   return  this.addGroupeCompetenceForm.controls.tags;
  }
  // tslint:disable-next-line:typedef
  getComppetences(){
    return this.competenceService.getCompetences().subscribe(
      data => {
        // @ts-ignore
        this.competences = data[`hydra:member`];
        // @ts-ignore
        data['hydra:member'].find(
          (c: Competences) => {
            this.allCompetence.push(c.libelle);
          }
        );
      }
    );
  }
  // tslint:disable-next-line:typedef
  getTag(){
    return this.tagService.getAllTag()
      .subscribe(
        data => {
            this.tagsModele = data['hydra:member'];
            this.dataSource = new MatTableDataSource<Tags>(this.tagsModele);
        }
      );
  }
  // tslint:disable-next-line:typedef
  getCompetenceChips(){
    // @ts-ignore
    this.filteredCompetences = this.competenceCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allCompetence.slice()));
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tabCompetence.push(value.trim());
      this.tabCompetenceValue.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.competenceCtrl.setValue(null);
    this.competenceCtrlfc.setValue(this.tabCompetence);
  }
  remove(fruit: string): void {
    const index = this.tabCompetence.indexOf(fruit);

    if (index >= 0) {
      this.tabCompetence.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tabCompetence.push(event.option.viewValue);
    this.tabCompetenceValue.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.competenceCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCompetence.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  // tslint:disable-next-line:typedef
  onAddCompetence(){
    if (this.isAddMode) {
      this.createGrpCompetence();
    } else {
      this.updateGroupeCompetence();
    }
  }
  private createGrpCompetence(){
    return this.competenceService.addGroupeCompetence(this.addGroupeCompetenceForm.value)
      .subscribe(
        () => {
          this.addGroupeCompetenceForm.reset();
          this.router.navigate(['/lister-groupes-competences']);
        }
      );
  }
  private updateGroupeCompetence(){
    // @ts-ignore
    return this.competenceService.updateGroupeCompetence(this.addGroupeCompetenceForm.value,Number(`${this.myId}`))
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/lister-groupes-competences']);
        }
      )
  }
  //////////////////////// tag ////////////////////
  /** Whether the number of selected elements matches the total number of rows. */
  // tslint:disable-next-line:typedef
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // tslint:disable-next-line:typedef
  masterToggle() {
    // @ts-ignore
    !this.isAllSelected() ? this.dataSource.data.forEach(row => this.selection.select(row)) : this.selection.clear();
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Tags): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  // tslint:disable-next-line:typedef
  getChecboxValu(value: any){
    this.tabTagValue.push(value);
    this.tagsValue.setValue(this.tabTagValue);
  }
  goBack(){
    this.router.navigate(['/lister-groupes-competences'])
  }
}
