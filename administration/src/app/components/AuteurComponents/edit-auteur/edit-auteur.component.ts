import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetApiService } from '../../../services/get-api-service';
import { PostApiService } from '../../../services/post-api-service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import {Urls} from "../../../services/Urls";

@Component({
  selector: 'app-edit-auteur',
  templateUrl: './edit-auteur.component.html',
  styleUrls: ['./edit-auteur.component.scss']
})
export class EditAuteurComponent implements OnInit {
  public showSpinner: boolean = false
  public gpes: any;
  public auteur: any;
  private emailRegx = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  private telRegx = "[0-9]{8}[0-9]*"
  public image;
  public uploadProgress: number;
  public oldImageUrl = Urls._downloadUrl + '/profiles/';
  //form
  public editAuteurForm: FormGroup;
  public pwdInputType: string = "password";
  public pwdVisibilityIcon: string = "visibility";
  //**** */
  constructor(
    private apiGet: GetApiService,
    private formBuilder: FormBuilder,
    private postApi: PostApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { 
    this.activeRoute.queryParams.subscribe(params=> {
      this.auteur = params;
    });
    this.editAuteurForm = formBuilder.group({//form group
      'nom': [this.auteur.nom, Validators.required],
      'prenom': [this.auteur.prenom, Validators.required],
      'domaine': [this.auteur.domaine, Validators.required],
      'groupe_de_recherche': [this.auteur.groupe_de_recherche],
      'specialite': [this.auteur.specialite, Validators.required],
      'etablissement': [this.auteur.etablissement, Validators.required],
      'tel': [this.auteur.tel, Validators.compose([Validators.required, Validators.pattern(this.telRegx)])],
      'email': [this.auteur.email, Validators.compose([Validators.required, Validators.pattern(this.emailRegx)])],
      'mot_de_passe': [null, Validators.compose([Validators.minLength(8)])],
      'grade': [this.auteur.grade, Validators.required],
      'diplome_en_preparation': [this.auteur.diplome_en_preparation]
    });
  }
  ngOnInit() {
    this.apiGet.getGpeDeRech().subscribe(val=> {
      this.gpes = val.gpeDeRech;
    });
    this.apiGet.getAuteurById(this.auteur.id).subscribe(val=>{
      this.oldImageUrl += val.auteurFound[0].image.replace(" ","%20");
      console.log(this.oldImageUrl);
    });
  }
  editAuteur(auteur,id) {
    let formData = new FormData();
    formData.append("id", id);
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
    formData.append("diplome_en_preparation", auteur.diplome_en_preparation);

    this.postApi.editAuteur(formData).subscribe(event=> {
      if(event.type===HttpEventType.UploadProgress) {
        this.showSpinner = true;
        this.uploadProgress = Math.round(event.loaded/event.total*100)
      }if(event.type === HttpEventType.Response){
        this.snackBar.open(event.body.message,'Ok',{duration: 2000});
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
