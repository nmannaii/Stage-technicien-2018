import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostApiService} from "../../../services/post-api-service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {EditDate} from "../../../services/EditDate";

@Component({
  selector: 'app-add-animation-sc',
  templateUrl: './add-animation-sc.component.html',
  styleUrls: ['./add-animation-sc.component.scss']
})
export class AddAnimationScComponent implements OnInit {
  public addAnimationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private postApi: PostApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private editDate: EditDate
  ) {
    this.addAnimationForm = formBuilder.group({
      'denomination': [null, Validators.required],
      'date': [null, Validators.required],
      'lieu': [null, Validators.required],
      'description': [null, Validators.required],
    });
  }

  ngOnInit() {

  }
  annuler(event) {
    event.preventDefault();
    this.router.navigate(['..'], { relativeTo: this.activatedRoute});
  }
  addAnimation(animation) {
    animation.date = this.editDate.setDateSqlFormat(animation.date);
    this.postApi.addAnimation(animation).subscribe(val => {
      if (val.success) {
        this.snackbar.open('Ajout d\'animation scientifique avec id ' + val.animationId, 'Ok', {duration: 3000});
        this.router.navigate(['..'], { relativeTo: this.activatedRoute});
      } else {
        this.snackbar.open(val.message, 'Ok', {duration: 3000});
      }
    });
  }
}
