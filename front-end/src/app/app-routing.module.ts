import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import { AnnuaireComponent } from './annuaire/annuaire.component';

const routes: Routes = [
  {path: '', component: PresentationComponent},
  {path: 'annuaire', component: AnnuaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
