import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Lightbox } from 'ngx-lightbox';
import { PostApiService } from '../../../services/post-api-service';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-actualite',
  templateUrl: './add-actualite.component.html',
  styleUrls: ['./add-actualite.component.scss']
})
export class AddActualiteComponent implements OnInit {
  public addActualiteForm: FormGroup;
  public image;
  public uploadProgress: number;
  public showSpinner: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private lightbox: Lightbox,
    private postApi: PostApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.addActualiteForm = formBuilder.group({
      'denomination': [null,Validators.required],
      'contenu': [null,Validators.required],
      'image': [null]
    });
  }

  ngOnInit() {
  }
  addActualite(actualite){
    let formdata = new FormData();
    formdata.append("denomination", actualite.denomination);
    formdata.append("contenu",actualite.contenu);
    if(this.image)
      formdata.append("image", this.image.file);
    this.postApi.addActualite(formdata).subscribe(event=>{
      if(event.type === HttpEventType.UploadProgress){
        this.showSpinner = true;
        this.uploadProgress = Math.round(event.loaded/event.total*100);
      }else if(event.type === HttpEventType.Response){
        this.snackBar.open("Ajout d'article avec ID: "+event.body.actualiteId,'Ok',{duration: 2000});
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
      }
    });
  }
  fileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = new Object();
      let fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        this.image.preview = event.target.result
      }
      this.image = {
        preview: this.image.preview,
        name: event.target.files[0].name,
        file: event.target.files[0]
      }
      // this.image.name = event.target.files[0].name;
      // this.image.file = event.target.files[0];
      fileReader.readAsDataURL(event.target.files[0]);
    }
  }
  showImg(){
    let albums = new Array();
    albums.push({src: this.image.preview});
    this.lightbox.open(albums);
  }
}
