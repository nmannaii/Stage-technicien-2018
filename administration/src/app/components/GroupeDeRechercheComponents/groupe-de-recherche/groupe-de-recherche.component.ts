import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-groupe-de-recherche',
  templateUrl: './groupe-de-recherche.component.html',
  styleUrls: ['./groupe-de-recherche.component.scss']
})
export class GroupeDeRechercheComponent implements OnInit {
  public headerText: string;
  public headerSubText: string;
  constructor(private location: Location, private route: Router) {
    this.initilizeHeaderText();
  }

  ngOnInit() {
    this.route.events.subscribe((val)=> {
      if(this.location.path()==="/dashboard/gpe_de_recherche") {
        this.headerText = "Liste des groupes de recherche"
        this.headerSubText = ""
      }
      else if(this.location.path()==="/dashboard/gpe_de_recherche/add_gpeDeRecherche") {
        this.headerText = "Ajouter un groupe de recherche"
        this.headerSubText = ""
      }
      else if(this.location.path().match("/dashboard/gpe_de_recherche/edit_gpeDeRecherche")) {
        this.headerText = "Modifier un groupe de recherche"
        this.headerSubText = ""
      }
      return;
    });
  }


//init headers text
  initilizeHeaderText() {
    if(this.location.path()==="/dashboard/gpe_de_recherche") {
      this.headerText = "Liste des groupes de recherche"
      this.headerSubText = ""
    }
    else if(this.location.path()==="/dashboard/gpe_de_recherche/add_gpeDeRecherche") {
      this.headerText = "Ajouter un groupe de recherche"
      this.headerSubText = ""
    }
    else if(this.location.path().match("/dashboard/gpe_de_recherche/edit_gpeDeRecherche")) {
      this.headerText = "Modifier un groupe de recherche"
      this.headerSubText = ""
    }
  }
}
