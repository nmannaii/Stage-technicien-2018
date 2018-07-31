import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialElementsModule } from './material-elements/material-elements.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MainNavComponent } from './main-nav/main-nav.component';
import { PresentationComponent } from './presentation/presentation.component';
import { AnnuaireComponent } from './annuaire/annuaire.component';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PresentationComponent,
    AnnuaireComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialElementsModule,
    FlexLayoutModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
