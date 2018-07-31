import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api-service';
import { PostApiService } from '../../../services/post-api-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-auteur',
  templateUrl: './list-auteur.component.html',
  styleUrls: ['./list-auteur.component.scss']
})
export class ListAuteurComponent implements OnInit {
  public notFound : boolean;
  public auteurs: any;
  constructor(
    private apiService: GetApiService,
    private postService: PostApiService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.apiService.getAuteur().subscribe((data) => {
      if (data.success){
        this.notFound = false
        this.auteurs = data.auteurFound;
      }
      else
        this.notFound = true
    });
  }

  delete(auteurId) {
    this.postService.deleteAuteur(auteurId).subscribe(val => {
      if (val.success) {
        this.apiService.getAuteur().subscribe((data) => {
          if (data.success){
            this.notFound = false;
            this.auteurs = data.auteurFound;
          }
          else
            this.notFound = true;
        });
      } else {
        alert(val.message);
      }
    });
  }
  sendEdit(auteur) {
    this.router.navigate(['./edit_auteur'],{ relativeTo: this.activeRoute,queryParams: auteur});
  }
}
