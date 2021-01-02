import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ADMINISTRATEURComponent} from './utilisateur-interface';
import {
  CerateReferentielComponent,
  CreateCompetenceComponent,
  CreateGroupeCompetenceComponent,
  CreateUtilisateurComponent,
  ItemProfileUsersComponent,
  ListerCompetencesComponent,
  ListerGroupeCompetencesComponent,
  ListerProfilesComponent,
  ListerReferentielsComponent,
  LoginComponent,
  ProfileDeSortieComponent,
  UtlisateursComponent
} from './fonctionnalites';
import {AuthGuard} from './_helpers/auth.guard';


const routes: Routes =
  [
    {
      path: 'login', component: LoginComponent
    },
    {
      path: '', redirectTo: 'admin', pathMatch: 'full', canActivate: [AuthGuard]
    },
    {
      path: 'admin', component: ADMINISTRATEURComponent, canActivate: [AuthGuard]
    },
    {
      path: 'liste-referentiel', component: ListerReferentielsComponent, canActivate: [AuthGuard]
    },
    {
      path: 'add-referentiel', component: CerateReferentielComponent, canActivate: [AuthGuard]
    },
    {
      path: 'lister-utilisateurs', component: UtlisateursComponent, canActivate: [AuthGuard]
    },
    {
      path: 'add-utilisateur', component: CreateUtilisateurComponent, canActivate: [AuthGuard]
    },
    {
      path: 'lister-profile', component: ListerProfilesComponent, canActivate: [AuthGuard],
      children: [
        {
          path: ':id/users', component: ItemProfileUsersComponent,
        }
      ]
    },
    {
      path: 'lister-groupes-competences', component: ListerGroupeCompetencesComponent, canActivate: [AuthGuard]
    },
    {
      path: 'add-groupe-competence', component: CreateGroupeCompetenceComponent, canActivate: [AuthGuard]
    },
    {
      path: 'lister-competences', component: ListerCompetencesComponent, canActivate: [AuthGuard]
    },
    {
      path: 'add-competences', component: CreateCompetenceComponent, canActivate: [AuthGuard]
    },
    {
      path: 'lister-profile-sortie', component: ProfileDeSortieComponent, canActivate: [AuthGuard]
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
