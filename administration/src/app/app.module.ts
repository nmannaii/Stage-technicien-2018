import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MaterialElementsModule } from './material-elements/material-elements.module'
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//services 
import { GetApiService } from './services/get-api-service';
import { PostApiService } from './services/post-api-service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGardService } from './services/auth-gard.service';
import { AlwayseRedirectService } from './services/always-redirect.service';
//--Components
import { AuteurComponent } from './components/AuteurComponents/auteur/auteur.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { AddAuteurComponent } from './components/AuteurComponents/add-auteur/add-auteur.component';
import { ListAuteurComponent } from './components/AuteurComponents/list-auteur/list-auteur.component';
import { GroupeDeRechercheComponent } from './components/GroupeDeRechercheComponents/groupe-de-recherche/groupe-de-recherche.component';
import { ListeGpeDeRechercheComponent } from './components/GroupeDeRechercheComponents/liste-gpe-de-recherche/liste-gpe-de-recherche.component';
import { AddGpeDeRechercheComponent } from './components/GroupeDeRechercheComponents/add-gpe-de-recherche/add-gpe-de-recherche.component';
import { EditAuteurComponent } from './components/AuteurComponents/edit-auteur/edit-auteur.component';
import { EditGpeDeRechercheComponent } from './components/GroupeDeRechercheComponents/edit-gpe-de-recherche/edit-gpe-de-recherche.component';
import { ArticleComponent } from './components/ArticleComponents/article/article.component';
import { EditArticleComponent } from './components/ArticleComponents/edit-article/edit-article.component';
import { AddArticleComponent } from './components/ArticleComponents/add-article/add-article.component';
import { ListArticleComponent } from './components/ArticleComponents/list-article/list-article.component';
import { ActualiteComponent } from './components/ActualiteComponents/actualite/actualite.component';
import { ListActualiteComponent } from './components/ActualiteComponents/list-actualite/list-actualite.component';
import { AddActualiteComponent } from './components/ActualiteComponents/add-actualite/add-actualite.component';
import { EditActualiteComponent } from './components/ActualiteComponents/edit-actualite/edit-actualite.component';
import { AnimationScComponent } from './components/AnimationScComponents/animation-sc/animation-sc.component';
import { AddAnimationScComponent } from './components/AnimationScComponents/add-animation-sc/add-animation-sc.component';
import { ListAnimationScComponent } from './components/AnimationScComponents/list-animation-sc/list-animation-sc.component';
import { EditAnimationScComponent } from './components/AnimationScComponents/edit-animation-sc/edit-animation-sc.component';
import {MAT_DATE_LOCALE} from '@angular/material';
import {OWL_DATE_TIME_LOCALE} from "ng-pick-datetime";
import {EditDate} from "./services/EditDate";
import {Urls} from "./services/Urls";






@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AuteurComponent,
    AuthentificationComponent,
    AddAuteurComponent,
    ListAuteurComponent,
    GroupeDeRechercheComponent,
    ListeGpeDeRechercheComponent,
    AddGpeDeRechercheComponent,
    EditAuteurComponent,
    EditGpeDeRechercheComponent,
    ArticleComponent,
    EditArticleComponent,
    AddArticleComponent,
    ListArticleComponent,
    ActualiteComponent,
    ListActualiteComponent,
    AddActualiteComponent,
    EditActualiteComponent,
    AnimationScComponent,
    AddAnimationScComponent,
    ListAnimationScComponent,
    EditAnimationScComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    MaterialElementsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GetApiService,
    PostApiService,
    AuthenticationService,
    AuthGardService,
    AlwayseRedirectService,
    EditDate,
    Urls,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
