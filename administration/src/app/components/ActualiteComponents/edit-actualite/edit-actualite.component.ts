import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Lightbox} from 'ngx-lightbox';
import {PostApiService} from '../../../services/post-api-service';
import {HttpEventType} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {Urls} from "../../../services/Urls";

@Component({
  selector: 'app-edit-actualite',
  templateUrl: './edit-actualite.component.html',
  styleUrls: ['./edit-actualite.component.scss']
})
export class EditActualiteComponent implements OnInit {
  public editActualiteForm: FormGroup;
  public actualite: any;
  public oldImageUrl = Urls._downloadUrl + '/actualites/';
  public image;
  public uploadProgress: number;
  public showSpinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postApi: PostApiService,
    private lightbox: Lightbox,
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.queryParams.subscribe(val => {
      this.actualite = val;
      this.oldImageUrl += val.image.replace(' ', '%20');
      console.log(this.oldImageUrl);
    })
    this.editActualiteForm = formBuilder.group({
      'denomination': [this.actualite.denomination, Validators.required],
      'contenu': [this.actualite.contenu, Validators.required]
    });
  }

  ngOnInit() {}

  editActualite (actualite) {
    const formData = new FormData();
    formData.append('id', this.actualite.id);
    formData.append('denomination', actualite.denomination);
    formData.append('contenu', actualite.contenu);
    if (this.image) {
      formData.append('image', this.image.file);
    }
    this.postApi.editActualite(formData).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        this.showSpinner = true;
        this.uploadProgress = Math.round( event.loaded / event.total * 100);
      } else if ( event.type === HttpEventType.Response ) {
        console.log(event);
        if (event.body.success ) {
          this.snackBar.open('Modification avec succès', 'ok', {duration: 4000});
          this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        } else {
          this.snackBar.open(event.body.message, 'ok', {duration: 2000});
        }
      }
    });
  }
  annuler(event) {
    event.preventDefault();
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
// for showing images form selected file
  fileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = {};
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        this.image.preview = event.target.result;
      };
      this.image = {
        preview: this.image.preview,
        name: event.target.files[0].name,
        file: event.target.files[0]
      };
      // this.image.name = event.target.files[0].name;
      // this.image.file = event.target.files[0];
      fileReader.readAsDataURL(event.target.files[0]);
    }
  }
  showImg(image) {
    const albums = [];
    albums.push({src: image});
    this.lightbox.open(albums);
  }
}
