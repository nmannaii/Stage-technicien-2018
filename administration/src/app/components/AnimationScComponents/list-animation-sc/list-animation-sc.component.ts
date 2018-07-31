import { Component, OnInit } from '@angular/core';
import {GetApiService} from "../../../services/get-api-service";
import {PostApiService} from "../../../services/post-api-service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-list-animation-sc',
  templateUrl: './list-animation-sc.component.html',
  styleUrls: ['./list-animation-sc.component.scss']
})
export class ListAnimationScComponent implements OnInit {
  public animations: any;
  public notFound = false;
  constructor(
    private getApi: GetApiService,
    private postApi: PostApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getApi.getAnimation().subscribe(data => {
      console.log(data);
      if (data.success) {
        this.notFound = false;
        this.animations = data.animations;
      } else {
        this.notFound = true;
      }
    });
  }
  sendEdit(animation) {
    this.router.navigate(['./edit_animation_sc'], {relativeTo: this.activeRoute, queryParams: animation});
  }
  delete(id) {
    this.postApi.deleteAnimation(id).subscribe(val => {
      if  (val.success) {
        this.getApi.getAnimation().subscribe(data => {
          console.log(data);
          if (data.success) {
            this.notFound = false;
            this.animations = data.animations;
          } else {
            this.notFound = true;
          }
        });
      } else {
        this.snackBar.open(val.message, 'Ok');
      }
    });
  }

}
