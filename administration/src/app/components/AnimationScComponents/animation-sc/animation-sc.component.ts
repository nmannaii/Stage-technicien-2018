import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animation-sc',
  templateUrl: './animation-sc.component.html',
  styleUrls: ['./animation-sc.component.scss']
})
export class AnimationScComponent implements OnInit {

  public headerText: string;
  public headerSubText: string;
  constructor(private location: Location, private route: Router) {
    this.initilizeHeaderText();
  }
  ngOnInit() {
    this.route.events.subscribe((val) => {
      if (this.location.path() === '/dashboard/animation_sc') {
        this.headerText = 'Liste des animations scientifique';
        this.headerSubText = '';
      }
      else if(this.location.path() === '/dashboard/animation_sc/add_animation_sc') {
        this.headerText = 'Ajouter une animation scientifique';
        this.headerSubText = ''
      }
      else if (this.location.path().match('/dashboard/animation_sc/edit_animation_sc')) {
        this.headerText = 'Modifier une animation scientifique';
        this.headerSubText = '';
      }
      return;
    });
  }
// init header texts
  initilizeHeaderText() {
    if (this.route.url === '/dashboard/animation_sc') {
      this.headerText = 'Liste des animations scientifique';
    }else if(this.route.url === '/dashboard/animation_sc/add_animation_sc') {
      this.headerText = 'Ajouter une animation scientifique';
      this.headerSubText = ''
    }
    else if(this.location.path().match('/dashboard/animation_sc/edit_animation_sc')) {
      this.headerText = 'Modifier une animation scientifique';
      this.headerSubText = '';
    }
  }

}
