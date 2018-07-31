import { Component, OnInit, ViewChild } from '@angular/core';
import { GetApiService } from '../../../services/get-api-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostApiService } from '../../../services/post-api-service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-auteur',
  templateUrl: './add-auteur.component.html',
  styleUrls: ['./add-auteur.component.scss']
})
export class AddAuteurComponent implements OnInit {
  public gpes: any;
  public newAuteur: any;
  public showSpinner: boolean = false;
  private emailRegx = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  private telRegx = "[0-9]{8}[0-9]*"
  public image: any;
  public uploadProgress: number;
  //form
  public addAuteurForm: FormGroup;
  public pwdVisibilityIcon: string = "visibility";
  public pwdInputType: string = "password";
  //**** */
  constructor(
    private apiGet: GetApiService,
    private formBuilder: FormBuilder,
    private postApi: PostApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.addAuteurForm = formBuilder.group({
      'nom': [null, Validators.required],
      'prenom': [null, Validators.required],
      'domaine': [null, Validators.required],
      'groupe_de_recherche': [null],
      'specialite': [null, Validators.required],
      'etablissement': [null, Validators.required],
      'tel': [null, Validators.compose([Validators.required, Validators.pattern(this.telRegx)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegx)])],
      'mot_de_passe': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'grade': [null, Validators.required],
      'image': [null],
      'diplome_en_preparation': [null]
    })
  }
  ngOnInit() {
    this.apiGet.getGpeDeRech().subscribe(val => {
      this.gpes = val.gpeDeRech;
    })
  }

  addNewAuteur(auteur) {
    let formData = new FormData();

    formData.append("nom", auteur.nom);
    formData.append("prenom", auteur.prenom);
    formData.append("domaine", auteur.domaine);
    formData.append("groupe_de_recherche", auteur.groupe_de_recherche);
    formData.append("specialite", auteur.specialite);
    formData.append("etablissement", auteur.etablissement);
    formData.append("tel", auteur.tel);
    formData.append("email", auteur.email);
    formData.append("mot_de_passe", auteur.mot_de_passe);
    formData.append("grade", auteur.grade);
    if(this.image)
      formData.append("image", this.image.file);
    formData.append("diplome_en_preparation", auteur.ndiplome_en_preparationom);
    this.postApi.addAuteur(formData).subscribe(event => {

      if(event.type===HttpEventType.UploadProgress) {
        this.showSpinner = true;
        this.uploadProgress = Math.round(event.loaded/event.total*100)
      }if(event.type === HttpEventType.Response){
        this.snackBar.open('Ajout d\'auteur avec id: '+event.body.auteurId,'Ok',{duration: 2000});
        this.router.navigate(['..'],{relativeTo: this.activeRoute});
      }
    });
  }
  annuler($event) {
    $event.preventDefault();
    this.router.navigate(['..']);
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

  visibilityCtrl(event,pwdType){
    event.preventDefault();
    if(pwdType === "password"){
      this.pwdInputType = "text";
      this.pwdVisibilityIcon = "visibility_off"
    }else {
      this.pwdInputType = "password";
      this.pwdVisibilityIcon = "visibility"
    }
  }
  /**
   *nom: nom,
    prenom: prenom,
    domaine: domaine,
    groupe_de_recherche: groupe_de_recherche,
    specialite: specialite,
    grade: grade,
    etablissement: etablissement,
    diplome_en_preparation: diplome_en_preparation,
    tel: tel,
    email: email,
    mot_de_passe: hashedPass
   */
}
