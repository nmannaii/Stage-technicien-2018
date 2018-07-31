import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetApiService } from '../../../services/get-api-service';
import { PostApiService } from '../../../services/post-api-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-actualite',
  templateUrl: './list-actualite.component.html',
  styleUrls: ['./list-actualite.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListActualiteComponent implements OnInit {
  public actualites: any;
  public notFound: boolean = false;
  constructor(
    private getApi: GetApiService,
    private postApi: PostApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getApi.getActualite().subscribe(data => {
      console.log(data);
      if (data.success) {
        this.notFound = false;
        this.actualites = data.actualites;
      } else {
        this.notFound = true;
      }
    });
  }
  sendEdit(actualite) {
    this.router.navigate(['./edit_actualite'], {relativeTo: this.activeRoute, queryParams: actualite});
  }
  delete(id) {
    this.postApi.deleteActualite(id).subscribe(val => {
      if (val.success) {
        this.getApi.getActualite().subscribe(data => {
          console.log(data);
          if (data.success) {
            this.notFound = false;
            this.actualites = data.actualites;
          } else {
            this.notFound = true;
          }
        });
      }
    });
  }
}
