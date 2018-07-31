import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostApiService} from "../../../services/post-api-service";
import {MatSnackBar} from "@angular/material";
import {EditDate} from "../../../services/EditDate";

@Component({
  selector: 'app-edit-animation-sc',
  templateUrl: './edit-animation-sc.component.html',
  styleUrls: ['./edit-animation-sc.component.scss']
})
export class EditAnimationScComponent implements OnInit {
  public editAnimationForm: FormGroup;
  private animation;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postApi: PostApiService,
    private snackBar: MatSnackBar,
    private editDate: EditDate
  ) {
    activatedRoute.queryParams.subscribe(data => {
      this.animation = data;
    });
    this.editAnimationForm = formBuilder.group({
      'denomination': [this.animation.denomination, Validators.required],
      'lieu': [this.animation.lieu, Validators.required],
      'date': [new Date(this.animation.date), Validators.required],
      'description': [this.animation.description, Validators.required],
    });
  }

  ngOnInit() {
  }
  editAnimation(animation) {
    animation.date = this.editDate.setDateSqlFormat(animation.date);
    animation.id = this.animation.id;
    this.postApi.editAnimation(animation).subscribe(val => {
      if (val.success) {
        this.snackBar.open(val.message, 'Ok', {duration: 4000});
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
      } else {
        this.snackBar.open(val.message, 'Ok', {duration: 2000});
      }
    });
  }

}
