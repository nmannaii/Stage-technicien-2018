import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetApiService } from '../../../services/get-api-service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostApiService } from '../../../services/post-api-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-gpe-de-recherche',
  templateUrl: './add-gpe-de-recherche.component.html',
  styleUrls: ['./add-gpe-de-recherche.component.scss']
})
export class AddGpeDeRechercheComponent implements OnInit {
  private emailRegx = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  private telFaxRegx = "[0-9]{8}[0-9]*";
  public showSpinner: boolean = false;
  public addGpe: FormGroup;
  public responsables: any;
  constructor(
    private formBuilder: FormBuilder,
    private getApi: GetApiService,
    private postApi: PostApiService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { 
    this.addGpe = formBuilder.group({
      'denomination': [null, Validators.required],
      'abreviation': [null, Validators.required],
      'tel': [null, Validators.compose([Validators.required, Validators.pattern(this.telFaxRegx)])],
      'fax': [null, Validators.compose([Validators.required, Validators.pattern(this.telFaxRegx)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailRegx)])],
      'objectif': [null, Validators.required],
      'mots_cles': [null, Validators.required],
      'responsable': [null, Validators.required],
    })
  }

  ngOnInit() {
    this.getApi.getAuteur().subscribe(val=> {
      this.responsables = val.auteurFound;
    })
  }

  annuler($event) {
    $event.preventDefault();
    this.router.navigate(['..'], {relativeTo: this.activeRoute});
  }

  addGroupeRech(groupeRech){
    //alert(JSON.stringify(groupeRech));
    this.postApi.addGroupeDeRecherche(groupeRech).subscribe(val=> {
      if(val.success) {
        this.snackBar.open("ajout de groupe avec id: "+val.gpeDeRechId, 'Ok', {duration: 4000});
        this.showSpinner = true;
        setTimeout(()=>{
          this.router.navigate(['..'], {relativeTo: this.activeRoute});
        }, 2000);
      }else {
        this.snackBar.open(val.message, 'Ok', {duration: 2000});
      }
    });
  }
}
