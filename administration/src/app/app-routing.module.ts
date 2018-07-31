import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuteurComponent } from './components/AuteurComponents/auteur/auteur.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AuthGardService } from './services/auth-gard.service';
import { AlwayseRedirectService } from './services/always-redirect.service';
import { AddAuteurComponent } from './components/AuteurComponents/add-auteur/add-auteur.component';
import { ListAuteurComponent } from './components/AuteurComponents/list-auteur/list-auteur.component';
import { GroupeDeRechercheComponent } from './components/GroupeDeRechercheComponents/groupe-de-recherche/groupe-de-recherche.component';
import { ListeGpeDeRechercheComponent } from './components/GroupeDeRechercheComponents/liste-gpe-de-recherche/liste-gpe-de-recherche.component';
import { AddGpeDeRechercheComponent } from './components/GroupeDeRechercheComponents/add-gpe-de-recherche/add-gpe-de-recherche.component';
import { EditAuteurComponent } from './components/AuteurComponents/edit-auteur/edit-auteur.component';
import { EditGpeDeRechercheComponent } from './components/GroupeDeRechercheComponents/edit-gpe-de-recherche/edit-gpe-de-recherche.component';
import { ArticleComponent } from './components/ArticleComponents/article/article.component';
import { ListArticleComponent } from './components/ArticleComponents/list-article/list-article.component';
import { AddArticleComponent } from './components/ArticleComponents/add-article/add-article.component';
import { EditArticleComponent } from './components/ArticleComponents/edit-article/edit-article.component';
import { ActualiteComponent } from './components/ActualiteComponents/actualite/actualite.component';
import { ListActualiteComponent } from './components/ActualiteComponents/list-actualite/list-actualite.component';
import { AddActualiteComponent } from './components/ActualiteComponents/add-actualite/add-actualite.component';
import { EditActualiteComponent } from './components/ActualiteComponents/edit-actualite/edit-actualite.component';
import {AnimationScComponent} from "./components/AnimationScComponents/animation-sc/animation-sc.component";
import {ListAnimationScComponent} from "./components/AnimationScComponents/list-animation-sc/list-animation-sc.component";
import {AddAnimationScComponent} from "./components/AnimationScComponents/add-animation-sc/add-animation-sc.component";
import {EditAnimationScComponent} from "./components/AnimationScComponents/edit-animation-sc/edit-animation-sc.component";

const routes: Routes = [
  {path: '', canActivate: [AlwayseRedirectService], component: AuthentificationComponent},
  {
    path: 'dashboard',
    canActivate: [AuthGardService],
    component: MainNavComponent,
    children: [
      {path: '', redirectTo: 'auteur', pathMatch: 'full'},
      {
        path: 'auteur', component: AuteurComponent,
        children: [
          {path: '', component: ListAuteurComponent},
          {path: 'add_auteur', component: AddAuteurComponent},
          {path: 'edit_auteur', component: EditAuteurComponent},
        ]
      },
      {
        path: 'gpe_de_recherche', component: GroupeDeRechercheComponent,
        children: [
          {path: '', component: ListeGpeDeRechercheComponent},
          {path: 'add_gpeDeRecherche', component: AddGpeDeRechercheComponent},
          {path: 'edit_gpeDeRecherche', component: EditGpeDeRechercheComponent}
        ]
      },
      {
        path: 'article', component: ArticleComponent,
        children: [
          {path: '', component: ListArticleComponent},
          {path: 'add_article', component: AddArticleComponent},
          {path: 'edit_article', component: EditArticleComponent}
        ]
      },
      {
        path: 'actualite', component: ActualiteComponent,
        children: [
          {path: '', component: ListActualiteComponent},
          {path: 'add_actualite', component: AddActualiteComponent},
          {path: 'edit_actualite', component: EditActualiteComponent}
        ]
      }, {
        path: 'animation_sc', component: AnimationScComponent,
        children: [
          {path: '', component: ListAnimationScComponent},
          {path: 'add_animation_sc', component: AddAnimationScComponent},
          {path: 'edit_animation_sc', component: EditAnimationScComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
