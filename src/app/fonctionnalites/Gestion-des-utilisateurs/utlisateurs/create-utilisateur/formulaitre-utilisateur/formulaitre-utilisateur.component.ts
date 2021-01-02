import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../../../modeles';
import {ProfileService} from '../../../../../_services/profile/profile.service';
import {UsersService} from '../../../../../_services/users/users.service';
import {Router, Routes} from '@angular/router';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-formulaitre-utilisateur',
  templateUrl: './formulaitre-utilisateur.component.html',
  styleUrls: ['./formulaitre-utilisateur.component.css']
})
export class FormulaitreUtilisateurComponent implements OnInit {
  // @ts-ignore
  fileData: File = null;
  previewUrl: any = null;
  // @ts-ignore
  fileUploadProgress: string = null;
  // @ts-ignore
  uploadedFilePath: string = null;
  // @ts-ignore
  addUserForm: FormGroup;
  submitted = false;
  // @ts-ignore
  profilTab: string[];
  // @ts-ignore
  profils: Profile[] ;
  constructor(private fb: FormBuilder, private profilService: ProfileService, private userService: UsersService, private route: Router) {
  }

  ngOnInit(): void {
    this.getProfil();
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Z][a-z0-9_-]{8,15}$')]],
      fisrtname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      profils: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }
  // tslint:disable-next-line:typedef
  get f(){ return this.addUserForm.controls; }
  // tslint:disable-next-line:typedef
  onFileSelected(imageInput: any) {
    this.fileData = (imageInput.target.files[0] as File);
    this.preview();
  }

  // tslint:disable-next-line:typedef
  preview() {
    // Show preview
    // tslint:disable-next-line:prefer-const
    let mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };

  }
  // tslint:disable-next-line:typedef
  getProfil(){
    return this.profilService.getAllProfile().subscribe(
      data => {
       /* this.profil = data['hydra:member'];
        console.log(this.profil);*/
       this.profils = data['hydra:member'];
      }
    );
  }
  // tslint:disable-next-line:typedef
  onAddUser(){
    this.submitted = true;
    if (this.addUserForm.invalid){
      return;
    }
    const formData = new FormData();
    formData.append('username', this.f.username.value);
    formData.append('fisrtname', this.f.fisrtname.value);
    formData.append('lastname', this.f.lastname.value);
    formData.append('email', this.f.email.value);
    formData.append('profils', this.f.profils.value);
    formData.append('photo', this.fileData);
    this.userService.addUser(formData).subscribe(
    data => {
    this.route.navigate(['/lister-utilisateurs']);
    }
  );
  }
  // tslint:disable-next-line:typedef
  onReset() {
    this.submitted = false;
    this.addUserForm.reset();
  }
}
