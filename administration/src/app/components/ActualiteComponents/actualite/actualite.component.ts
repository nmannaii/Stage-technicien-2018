import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss']
})
export class ActualiteComponent implements OnInit {

  public headerText: string;
  public headerSubText: string;
  constructor(private location: Location, private route: Router) {
    this.initilizeHeaderText();
  }
  ngOnInit(){
    this.route.events.subscribe((val)=> {
      if(this.location.path()==="/dashboard/actualite") {
        this.headerText = "Liste des actualites"
        this.headerSubText = ""
      }
      else if(this.location.path()==="/dashboard/actualite/add_actualite") {
        this.headerText = "Ajouter une actualité"
        this.headerSubText = ""
      }
      else if(this.location.path().match("/dashboard/actualite/edit_actualite")) {
        this.headerText = "Modifier une actualité"
        this.headerSubText = ""
      }
      return;
    });
  }
//init header texts
  initilizeHeaderText() {
    if(this.route.url==="/dashboard/actualite") {
      this.headerText = "Liste des actualites"
      this.headerSubText = "Cliquer sur le stylo pour modifier ou sur la poubelle pour supprimer"
    }else if(this.route.url==="/dashboard/actualite/add_actualite") {
      this.headerText = "Ajouter une actulalité"
      this.headerSubText = ""
    }
    else if(this.location.path().match("/dashboard/actualite/edit_actualite")) {
      this.headerText = "Modifier une actualité"
      this.headerSubText = ""
    }
  }

}
