import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetApiService } from '../../../services/get-api-service';
import { PostApiService } from '../../../services/post-api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListArticleComponent implements OnInit {
  public articles: any;
  public notFound: boolean = false;
  constructor(
    private getApi: GetApiService,
    private postApi: PostApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getApi.getArticle().subscribe(data=> {
      if(data.success){
        this.notFound = false;
        this.articles = data.articles;
      } else
        this.notFound = true;
    })
  }

  delete(articleId) {
    this.postApi.deleteArticle(articleId).subscribe(val => {
      if (val.success) {
        this.getApi.getArticle().subscribe((data) => {
          if (data.success)
            this.articles = data.articles;
          else
            this.notFound = true;
        });
      } else {
        alert(val.message);
      }
    });
  }
  sendEdit(article) {
    this.router.navigate(['./edit_article'], {relativeTo: this.activeRoute, queryParams: article});
  }

  /**
   *denomination: denomination,
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
}
