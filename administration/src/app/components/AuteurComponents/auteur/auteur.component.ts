import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuteurComponent implements OnInit {
  public headerText: string;
  public headerSubText: string;
  constructor(private location: Location, private route: Router) {
    this.initilizeHeaderText();
  }
  ngOnInit(){
    this.route.events.subscribe((val)=> {
      if(this.location.path()==="/dashboard/auteur") {
        this.headerText = "Liste des auteurs"
        this.headerSubText = ""
      }
      else if(this.location.path()==="/dashboard/auteur/add_auteur") {
        this.headerText = "Ajouter un auteur"
        this.headerSubText = ""
      }
      else if(this.location.path().match("/dashboard/auteur/edit_auteur")) {
        this.headerText = "Modifier un auteur"
        this.headerSubText = ""
      }
      return;
    });
  }
//init header texts
  initilizeHeaderText() {
    if(this.route.url==="/dashboard/auteur") {
      this.headerText = "Liste des auteurs"
      this.headerSubText = "Cliquer sur le stylo pour modifier ou sur la poubelle pour supprimer"
    }else if(this.route.url==="/dashboard/auteur/add_auteur") {
      this.headerText = "Ajouter un auteur"
      this.headerSubText = ""
    }
    else if(this.location.path().match("/dashboard/auteur/edit_auteur")) {
      this.headerText = "Modifier un auteur"
      this.headerSubText = ""
    }
  }
}
