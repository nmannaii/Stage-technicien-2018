import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public headerText: string;
  public headerSubText: string;
  constructor(private location: Location, private route: Router) {
    this.initilizeHeaderText();
  }
  ngOnInit(){
    this.route.events.subscribe((val)=> {
      if(this.location.path()==="/dashboard/article") {
        this.headerText = "Liste des articles"
        this.headerSubText = ""
      }
      else if(this.location.path()==="/dashboard/article/add_article") {
        this.headerText = "Ajouter un article"
        this.headerSubText = ""
      }
      else if(this.location.path().match("/dashboard/article/edit_article")) {
        this.headerText = "Modifier un article"
        this.headerSubText = ""
      }
      return;
    });
  }
//init header texts
  initilizeHeaderText() {
    if(this.route.url==="/dashboard/article") {
      this.headerText = "Liste des articles"
      this.headerSubText = "Cliquer sur le stylo pour modifier ou sur la poubelle pour supprimer"
    }else if(this.route.url==="/dashboard/article/add_article") {
      this.headerText = "Ajouter un auteur"
      this.headerSubText = ""
    }
    else if(this.location.path().match("/dashboard/article/edit_article")) {
      this.headerText = "Modifier un auteur"
      this.headerSubText = ""
    }
  }

}
