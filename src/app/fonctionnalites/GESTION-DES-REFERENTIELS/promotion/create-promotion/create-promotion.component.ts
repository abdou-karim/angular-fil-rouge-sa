import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ReferentielService} from '../../../../_services';
import {Referentiels} from '../../../../modeles/referentiels';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {UsersService} from '../../../../_services/users/users.service';
import {Utilisateur} from '../../../../modeles';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {PromoService} from '../../../../_services/promotion/promo.service';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import Swal from 'sweetalert2';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreatePromotionComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fruitCtrl = new FormControl();
  tabApprenant: string[] = [];
  tabNRef: string[] = [];
  // @ts-ignore
  indexRef: number;
  tab: Utilisateur[] = [];
  // @ts-ignore
  tabA: string[] = [] ;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];
  Apprenant: Utilisateur[] = [];
  // @ts-ignore
  firstFormGroup: FormGroup;
  // @ts-ignore
  secondFormGroup: FormGroup;
  // @ts-ignore
  referentiel: Referentiels[];
  // @ts-ignore
  referentielon: Referentiels[];
  tabRef: string[] = [];
  // @ts-ignore
  fileData: File = null;
  compte = 0;
  num = 1;
  numRef = 1;
  // @ts-ignore
  totalItemsRef: number;
  // @ts-ignore
  nombrePageRef: number;
  // @ts-ignore
  RefPerPage: number;
  disableBtnP: boolean = false;
  disableBtnN: boolean = false;
  // @ts-ignore
  totalItems: number;
  // @ts-ignore
  nombrePage: number;
  // @ts-ignore
  UserPerPage: number;
  isOptional = false;
  csvRecords: any[] = [];
  header = false;
  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private fb: FormBuilder, private referentielService: ReferentielService,
              private UserService: UsersService, private promoSercice: PromoService, private ngxParser: NgxCsvParser) { }
  // @ts-ignore
  myForm: FormGroup;
  ngOnInit(): void {
    this.getReferentiel();
    this.getApprenant();
    this.firstFormGroup = this.fb.group({
      langue: ['', [Validators.required]],
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lieu: ['', [Validators.required]],
      fabrique: ['', [Validators.required]],
      dateDebut: ['', [Validators.required]],
      dateFinReelle: ['', [Validators.required]],
      dateFinProvisoire: ['', [Validators.required]],
      referentiels: [[], [Validators.required]],
      avatar: ['', [Validators.required]],
    });
    this.secondFormGroup = this.fb.group({
      email: [[], [Validators.required]]
    });

  }
  get refControl(){
    return this.firstFormGroup.controls.referentiels;
  }
  get avatar(){
    return this.firstFormGroup.controls.avatar;
  }
  get f(){
    return this.firstFormGroup.controls;
  }
  // tslint:disable-next-line:typedef
  getReferentiel(){
    return this.referentielService.getReferentielR(Number(`${this.numRef}`))
      .subscribe(
        data => {
          this.referentiel =  data['hydra:member'];
          // @ts-ignore
          this.totalItemsRef = data['hydra:totalItems'];
          // @ts-ignore
          this.RefPerPage = data['hydra:member'].length;
        }
      );
  }
  // tslint:disable-next-line:typedef
  next() {
    this.numRef = this.numRef + 1;
    this.nombrePageRef = this.totalItemsRef / this.RefPerPage;
    if (this.numRef >= this.nombrePageRef) {
      this.disableBtnN = true;
      this.numRef = this.nombrePageRef;
    }
    this.disableBtnP = true;
    return this.referentielService.getReferentielR(Number(`${this.numRef}`)).subscribe(data => {
      // @ts-ignore
      this.referentiel = data['hydra:member'];
    });
  }

  // tslint:disable-next-line:typedef
  preview() {
    this.numRef = this.numRef - 1;
    if (this.numRef <= 1) {
      this.numRef = 1;
      this.disableBtnP = false;
    }
    if (this.numRef < this.nombrePageRef) {
      this.disableBtnN = false;
    }
    // tslint:disable-next-line:triple-equals
    return this.referentielService.getReferentielR(Number(`${this.numRef}`)).subscribe(data => {
      // @ts-ignore
      this.referentiel = data['hydra:member'];
    });
  }
  getApprenant(){
    let timeOu = setTimeout(
      () => {
        this.num = this.num +1;
        this.nombrePage = this.totalItems / this.UserPerPage;
        if (this.num >= this.nombrePage) {
          this.num = this.nombrePage;
        }
        this.getApprenant();
      }
      ,500)
    return this.UserService.getAllApprenat(Number(`${this.num}`)).subscribe(
      data => {
       // @ts-ignore
         this.Apprenant = data['hydra:member'];
        // @ts-ignore
        this.totalItems = data['hydra:totalItems'];
        // @ts-ignore
        this.UserPerPage = data['hydra:member'].length;
         // @ts-ignore
        if(this.tab.indexOf(data['hydra:member']) === -1){
          // @ts-ignore
          this.tab.push(data['hydra:member']);
        }
        for (const a of this.tab) {
          // @ts-ignore
          for (let ab of a) {
            // @ts-ignore
            if(this.tabA.indexOf(ab.email) === -1){
              this.tabA.push(ab.email)
            }
            if (this.tab.length === this.nombrePage){
              window.clearTimeout(timeOu)
            }
          }
        }
      }
    );

  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.tabApprenant.push(event.option.value);
    this.fruits.push({name: event.option.value});
    this.emailControl.setValue(this.tabApprenant)
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  get emailControl(){
    return this.secondFormGroup.controls.email
  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  uploadFile(evt: any){
// evt est un tableau des fichier(s) déposés sur notre div. Ici nous supposerons qu'il y a un seul fichier uploadé
    this.fileData = evt[0];
    const payload = new FormData();
    payload.append('data', evt[0]);
    // Nous pouvons maintenant uploader le fichier en lancant une requete POST avec la variable payload comme corps de requete :)
  }
  uploadFileCVS(evt: any){
    // Parse the file you want to select for the operation along with the configuration
    this.ngxParser.parse(evt[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: any) => {

     // console.log('Result', result);
      let colone = result[0];
      this.csvRecords = result;
      for (let i=0;i<this.csvRecords.length;i++){
        console.log(this.csvRecords[i]);
        for (let h=0;h<this.csvRecords[i].length;h++){
          if(colone[h] ==='email' && this.csvRecords[i][h] !=='email'){
            //console.log(this.csvRecords[i][h]);
            if(this.tabApprenant.indexOf(this.csvRecords[i][h]) ===-1){
              this.tabApprenant.push(this.csvRecords[i][h]);
            }

          }

        }

      }
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }
  // tslint:disable-next-line:typedef
  onCreate(){
  }
  // tslint:disable-next-line:typedef
  tes(ref: Referentiels, el: any,refId: any){
    if (el.checked === false){
    // @ts-ignore
      const idex = this.tabRef.indexOf(ref);
      const indexx = this.tabNRef.indexOf(refId);
      this.tabRef.splice(idex, 1);
      this.tabNRef.splice(indexx,1);
      console.log(this.refControl.value);
    }
    // @ts-ignore
    if (el.checked === true ){
      // @ts-ignore
      this.tabRef.push(ref);
      // @ts-ignore
      this.referentielon = this.tabRef;
      this.indexRef = this.referentielon.indexOf(ref);
      this.tabNRef.push(refId);
      this.refControl.setValue(this.tabNRef);
    }
    console.log(this.indexRef);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
  let email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\ .,;:\s@"]+)*)|(" . +"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // Add our fruit
    if ((value || '').trim()) {
if (email_regex.test(value.trim())){
  this.fruits.push({name: value.trim()});
  this.tabApprenant.push(value.trim());
  this.emailControl.setValue(this.tabApprenant);
}else {
  this.emailControl.setValidators(Validators.required)
}

    }


    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.tabApprenant.splice(index, 1);
    }
  }
  sendEmailAndAddAppRef(id: number){
    console.log(id);
    if (this.secondFormGroup.valid){
      this.referentielService.sendEmailAndAddAppRef(Number(`${id}`),this.secondFormGroup.value)
        .subscribe(
          () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Email envoyé avec success',
              showConfirmButton: false,
              timer: 1500
            })
          }
        );
    }
  }
  sendEmail(id: number, email: string[]){
    return this.referentielService.sendOneEmailAndAddAppRef(Number(`${id}`),email)
      .subscribe(
        () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Email envoyé avec success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      );
  }
  addPromo(){
   if(this.firstFormGroup.invalid || this.secondFormGroup.invalid){
     return
   }
    console.log(this.firstFormGroup.value);
  let formData = new FormData();
   formData.append('langue',this.f.langue.value);
   formData.append('titre',this.f.titre.value);
   formData.append('description',this.f.description.value);
   formData.append('lieu',this.f.lieu.value);
   formData.append('fabrique',this.f.fabrique.value);
   formData.append('dateDebut',this.f.dateDebut.value);
   formData.append('dateFinReelle',this.f.dateFinReelle.value);
   formData.append('dateFinProvisoire',this.f.dateFinProvisoire.value);
   formData.append('referentiels',JSON.stringify(this.f.referentiels.value));
   formData.append('avatar',this.fileData);
  this.promoSercice.addPromotion(formData).subscribe(
    data => {


      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  );
  }
}
