import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetApiService } from '../../../services/get-api-service';
import { PostApiService } from '../../../services/post-api-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-gpe-de-recherche',
  templateUrl: './edit-gpe-de-recherche.component.html',
  styleUrls: ['./edit-gpe-de-recherche.component.scss']
})
export class EditGpeDeRechercheComponent implements OnInit {

  private emailRegx = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  private telFaxRegx = "[0-9]{8}[0-9]*";
  public showSpinner: boolean = false;
  public editGpe: FormGroup;
  public responsables: any;
  public groupeDeRech: any;
  constructor(
    private formBuilder: FormBuilder,
    private getApi: GetApiService,
    private postApi: PostApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.activeRoute.queryParams.subscribe(params=> {
      this.groupeDeRech = params;
    });
    this.editGpe = formBuilder.group({
      'denomination': [this.groupeDeRech.denomination, Validators.required],
      'abreviation': [this.groupeDeRech.abreviation, Validators.required],
      'tel': [this.groupeDeRech.tel, Validators.compose([Validators.required, Validators.pattern(this.telFaxRegx)])],
      'fax': [this.groupeDeRech.fax, Validators.compose([Validators.required, Validators.pattern(this.telFaxRegx)])],
      'email': [this.groupeDeRech.email, Validators.compose([Validators.required, Validators.pattern(this.emailRegx)])],
      'objectif': [this.groupeDeRech.objectif, Validators.required],
      'mots_cles': [this.groupeDeRech.mots_cles, Validators.required],
      'responsable': [this.groupeDeRech.responsable, Validators.required],
    })
  }

  ngOnInit() {
    this.getApi.getAuteur().subscribe(val=> {
      this.responsables = val.auteurFound;
    })
  }

  editGpeDeRecherche(gpeDeRech,id) {
    gpeDeRech.id=id;
    this.postApi.editGroupeDeRecherche(gpeDeRech).subscribe(val=> {
      if(val.success){
        this.showSpinner = true;
        setTimeout(()=>{
          this.snackBar.open(val.message,'OK',{duration: 4000});
          this.router.navigate(['..'], {relativeTo: this.activeRoute});
        },2000);
      }else{
        this.snackBar.open(val.message,'OK',{duration: 2000});
      }
    });
  }

  annuler($event) {
    $event.preventDefault();
    this.router.navigate(['..'], {relativeTo: this.activeRoute});
  }

}
