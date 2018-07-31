import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostApiService } from '../../../services/post-api-service';
import { GetApiService } from '../../../services/get-api-service';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  public selectedFile= null;
  public addArticleForm: FormGroup;
  public auteurs: Array<{ nom: string }> = new Array<{ nom: 'none' }>();
  public showSpinner: boolean = false;
  public uploadProgress: number;
  public upload;
  constructor(
    private formBuilder: FormBuilder,
    private postApi: PostApiService,
    private getApi: GetApiService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { 
    this.addArticleForm = formBuilder.group({
      'denomination': [null, Validators.required],
      'numero': [null, Validators.required],
      'volume': [null, Validators.required],
      'date_de_parution': [null, Validators.required],
      'mot_cle': ['', Validators.required],
      'resume': [null, Validators.required],
      'pages': [null, Validators.required],
      'auteurs': [null, Validators.required],
      'domaine': [null, Validators.required],
      'revue_scientifique': [null, Validators.required],
      'fichier': [null],
    });
  }

  ngOnInit() {
    this.getApi.getAuteur().subscribe(val=> {
      val.auteurFound.forEach(val => {
        this.auteurs = [...this.auteurs, { nom: val.nom + " " + val.prenom }];
      });
    })
  }

  /**
   * denomination: denomination,
    numero: numero,
    volume: volume,
    date_de_parution: date_de_parution,
    mot_cle: mot_cle,
    resume: resume,
    pages: pages,
    auteurs: auteurs,
    domaine: domaine,
    revue_scientifique: revue_scientifique,
    fichier: fichier
   */
  fileSelected(event){
    this.selectedFile = event.target.files[0];
  }
  addArticle(article) {
    let formData = new FormData;
    formData.set('denomination', article.denomination);
    formData.set('numero', article.numero);
    formData.set('volume', article.volume);
    formData.set('date_de_parution', article.date_de_parution);
    formData.set('mot_cle', article.mot_cle);
    formData.set('resume', article.resume);
    formData.set('pages', article.pages);
    let listeDesAuteurs: string='';
    article.auteurs.forEach(val=>{
        listeDesAuteurs += val.nom+"," 
    });
    listeDesAuteurs = listeDesAuteurs.substr(0,listeDesAuteurs.length-1)
    formData.set('auteurs', listeDesAuteurs);
    formData.set('domaine', article.domaine);
    formData.set('revue_scientifique', article.revue_scientifique);
    formData.set('fichier', this.selectedFile);
    this.upload = this.postApi.addArticle(formData).subscribe(event=> {
      console.log(event);
      if(event.type===HttpEventType.UploadProgress) {
        this.showSpinner = true;
        this.uploadProgress = Math.round(event.loaded/event.total*100)
      }if(event.type === HttpEventType.Response){
        this.snackBar.open('Ajout d\'article avec id: '+event.body.articleId,'Ok',{duration: 2000});
        
        this.router.navigate(['..'],{relativeTo: this.activeroute});
      }
    });
  }

  annuler(event) {
    event.preventDefault();
    if(this.upload)
      this.upload.unsubscribe();
    this.router.navigate(['..'],{relativeTo: this.activeroute});
  }
}
