import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetApiService } from '../../../services/get-api-service';
import { PostApiService } from '../../../services/post-api-service';
import { MatSelect, MatSnackBar } from '@angular/material';
import { HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  @ViewChild('selecting') selecting: MatSelect;
  @ViewChild('searchInput') searchInput: ElementRef;
  private editArticleForm: FormGroup;
  public notValid: boolean;
  public showSpinner: boolean = false;
  public uploadProgress: number;
  private article: any;
  public imageURL: string = "";
  public auteurs: Array<{ nom: string }> = new Array<{ nom: 'none' }>();
  public auteurArray: Array<{ nom: string }> = new Array<{ nom: 'none' }>();
  public notFound404: boolean = false;
  public selectedFile;
  public selectedItems = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private getApi: GetApiService,
    private postApi: PostApiService,
    private snackBar: MatSnackBar
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      this.article = params
    });
    this.getApi.getAuteur().subscribe(val => {
      val.auteurFound.forEach(val => {
        this.auteurs = [...this.auteurs, { nom: val.nom + " " + val.prenom }];
      });
      this.article.auteurs.split(',').forEach(auteur => {
        this.selectedItems =  [...this.selectedItems, {nom: auteur}];
      });
    });
    if (this.article.fichier) {
      if (this.article.fichier.endsWith(".pdf")) {
        this.imageURL = "./assets/imgs/pdf.png"
      } else if (this.article.fichier.endsWith(".docx")) {
        this.imageURL = "./assets/imgs/word.png"
      } else {
        this.imageURL = "./assets/imgs/file.png"
      }
    }

    this.editArticleForm = formBuilder.group({
      'denomination': [this.article.denomination, Validators.required],
      'numero': [this.article.numero, Validators.required],
      'volume': [this.article.volume, Validators.required],
      'date_de_parution': [this.article.date_de_parution, Validators.required],
      'mot_cle': [this.article.mot_cle, Validators.required],
      'resume': [this.article.resume, Validators.required],
      'pages': [this.article.pages, Validators.required],
      'auteurs': [this.auteurArray, Validators.required],
      'domaine': [this.article.domaine, Validators.required],
      'revue_scientifique': [this.article.revue_scientifique, Validators.required],
      'fichier': [this.article.fichier]
    });
  }
  fileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit() {
    /*this.selecting.openedChange.subscribe(val=>{
        this.searchInput.nativeElement.value="";
        this.searchInput.nativeElement.dispatchEvent(new Event('input'));
        this.selecting.valueChange.subscribe(val=>{
          console.log(val);
        });
        //console.log("sel")
        //console.log(this.selectedItems);
    });*/
  }
  /*filterAuteur(auteur){
    this.selectedItemsHistory = this.selectedItems;
    this.auteursFiltered= this.auteurs.filter(val=> {
      //|| this.selectedItems.includes(val.noif(this.selectedItems.length<this.selectedItemsHistory.length){
      return (((val.nom+" "+val.prenom).toLowerCase()).includes(auteur.toLowerCase()));
    });
    if(this.auteursFiltered.length!==0)
      this.notFound404 = false
    else
      this.notFound404 = true
  }*/
  editArticle(article, id) {
    let formData = new FormData();
    formData.append('id', id)
    formData.append('denomination', article.denomination);
    formData.append('numero', article.numero);
    formData.append('volume', article.volume);
    formData.append('date_de_parution', article.date_de_parution);
    formData.append('mot_cle', article.mot_cle);
    formData.append('resume', article.resume);
    formData.append('pages', article.pages);
    let listeDesAuteurs = '';
    console.log(article.auteurs);
    article.auteurs.forEach(val => {
        listeDesAuteurs += val.nom + ',';
    });
    listeDesAuteurs = listeDesAuteurs.substr(0,listeDesAuteurs.length-1)
    formData.append('auteurs', listeDesAuteurs);
    formData.append('domaine', article.domaine);
    formData.append('revue_scientifique', article.revue_scientifique);
    if (this.selectedFile) {
      formData.append('fichier', this.selectedFile);
    } else {
      formData.append('fichier', article.fichier);
    }
    this.postApi.editArticle(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.showSpinner = true;
        this.uploadProgress = Math.round(event.loaded / event.total * 100)
      }
      if (event.type === HttpEventType.Response) {
        this.snackBar.open('L\'article a été modifier avec succès', 'Ok', { duration: 4000 });
        this.route.navigate(['..'], { relativeTo: this.activeRoute });
      }
    });
  }
  annuler(event) {
    event.preventDefault();
    this.route.navigate(['..'], { relativeTo: this.activeRoute });
  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.notValid = !this.editArticleForm.valid;
    })
  }
}
