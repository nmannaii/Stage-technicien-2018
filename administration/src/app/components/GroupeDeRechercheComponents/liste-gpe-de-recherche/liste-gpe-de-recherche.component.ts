import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetApiService } from '../../../services/get-api-service';
import { PostApiService } from '../../../services/post-api-service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-gpe-de-recherche',
  templateUrl: './liste-gpe-de-recherche.component.html',
  styleUrls: ['./liste-gpe-de-recherche.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListeGpeDeRechercheComponent implements OnInit {
  public notFound: boolean;
  public gpes: any;
  constructor(
    private apiService: GetApiService,
    private postApi: PostApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.apiService.getGpeDeRech().subscribe(val=> {
      if(val.success) {
        this.notFound = false;
        this.gpes = val.gpeDeRech;
      }else {
        this.notFound = true
      }
    });
  }

  sendToEdit(gpe){
    this.router.navigate(['./edit_gpeDeRecherche'], {relativeTo: this.activatedRoute, queryParams: gpe});
  }

  delete(id){
    this.postApi.deleteGroupeDeRecherche(id).subscribe(val=>{
      if(val.success){
        this.snackBar.open(val.message,'ok',{duration: 2000});
        this.apiService.getGpeDeRech().subscribe(val=> {
          if(val.success) {
            this.notFound = false;
            this.gpes = val.gpeDeRech;
          }else {
            this.notFound = true;
          }
        });
      }
      else
        this.snackBar.open(val.message,'ok',{duration: 2000});
    })
  }

}
