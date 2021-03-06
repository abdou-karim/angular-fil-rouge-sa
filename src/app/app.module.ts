import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { NavBarComponent, NavBarIsCurrentUserComponent } from './nav-bar';
import { ADMINISTRATEURComponent } from './utilisateur-interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { UploadDirective } from './directives';
import {
  LoginComponent,
  CerateReferentielComponent,
  ListerReferentielsComponent,
  LoginFormulaireComponent,
  CreatePromotionComponent,
  PromotionComponent,
  FormulaireReferentielComponent,
  ListerGroupeCompetencesComponent,
  ItemsGroupeCompetencesComponent,
  ItemReferentielsComponent,
  FormulaitreUtilisateurComponent,
  UtlisateursComponent,
  CreateUtilisateurComponent,
  ItemUtilisateursComponent,
  ListerProfilesComponent,
  ItemsProfileComponent,
  FormulaireGroupeCompetenceComponent,
  CreateGroupeCompetenceComponent,
  FormulaireCompetenceComponent,
  CreateCompetenceComponent,
  ItemsCompetencesComponent,
  ListerCompetencesComponent, ItemsProfileDeSortieComponent,
  ProfileDeSortieComponent, ItemProfileUsersComponent, ItemUtilisateurDetailsComponent, ViewerProgrammeComponent
} from './fonctionnalites';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  IgxChipsModule,
  IgxIconModule
} from 'igniteui-angular';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';







@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavBarIsCurrentUserComponent,
    PromotionComponent,
    CreatePromotionComponent,
    ADMINISTRATEURComponent,
    UploadDirective,
    LoginComponent,
    LoginFormulaireComponent,
    ListerReferentielsComponent,
    CerateReferentielComponent,
    FormulaireReferentielComponent,
    ItemReferentielsComponent,
    UtlisateursComponent,
    ItemUtilisateursComponent,
    CreateUtilisateurComponent,
    FormulaitreUtilisateurComponent,
    ListerProfilesComponent,
    ItemsProfileComponent,
    ListerGroupeCompetencesComponent,
    ItemsGroupeCompetencesComponent,
    CreateGroupeCompetenceComponent,
    FormulaireGroupeCompetenceComponent,
    ListerCompetencesComponent,
    ItemsCompetencesComponent,
    CreateCompetenceComponent,
    FormulaireCompetenceComponent,
    ProfileDeSortieComponent,
    ItemsProfileDeSortieComponent,
    ItemUtilisateurDetailsComponent,
    ItemProfileUsersComponent,
    ViewerProgrammeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
      IgxChipsModule,
      IgxIconModule,
      NgxCsvParserModule,
      NgxQRCodeModule


    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
