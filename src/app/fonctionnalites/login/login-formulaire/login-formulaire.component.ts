import {Component, Input, OnInit} from '@angular/core';
import {NavBarService} from '../../../_services';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/authentification/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login-formulaire',
  templateUrl: './login-formulaire.component.html',
  styleUrls: ['./login-formulaire.component.css']
})
export class LoginFormulaireComponent implements OnInit {
  // @ts-ignore
  myboolean: boolean = false;
  // @ts-ignore
  loginForm: FormGroup;
  submitted = false;
  // @ts-ignore
  returnUrl: string;
  // tslint:disable-next-line:max-line-length
  constructor(private etatNavbar: NavBarService, private router: Router,
              private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Z][a-z0-9_-]{8,15}$')]],
      password: ['', [Validators.required, Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]]
    });
  }
  // tslint:disable-next-line:typedef
  get f(){ return this.loginForm.controls; }
  // tslint:disable-next-line:typedef
  onSummit(){
    this.submitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.authService.setBoolEtatConnection(true);
        }
      );
  }
  // tslint:disable-next-line:typedef
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
