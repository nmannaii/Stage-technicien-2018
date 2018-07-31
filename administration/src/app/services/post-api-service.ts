import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Urls} from "./Urls";


@Injectable()

export class PostApiService {
    private _URL = Urls._ApiURL;
    private options;
    private  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    constructor(private http: HttpClient) {
    }
    /********************Auteur */
    addAuteur(auteur: FormData) {
        return this.http.post<ServerOut>( this._URL + '/auteur/add', auteur , {
          headers: this.headers,
          reportProgress: true,
          observe: 'events'
        });
    }
    editAuteur(auteur) {
        return this.http.post<ServerOut>(this._URL + '/auteur/edit/', auteur , {
          headers: this.headers,
          reportProgress: true,
          observe: 'events'
        });
    }
    deleteAuteur(id): Observable<ServerOut> {
        return this.http.delete<ServerOut>(this._URL + '/auteur/delete/' + id, {
          headers: this.headers
        });
    }
    // ******************Groupe de recherche */
    addGroupeDeRecherche(groupeDeRech) {
        return this.http.post<ServerOut>(this._URL + '/groupe_de_recherche/add' , groupeDeRech , {
          headers: this.headers
        });
    }
    editGroupeDeRecherche(groupeDeRech) {
        return this.http.put<ServerOut>(this._URL + '/groupe_de_recherche/edit' , groupeDeRech , {
          headers: this.headers
        });
    }
    deleteGroupeDeRecherche(id) {
        return this.http.delete<ServerOut>(this._URL + '/groupe_de_recherche/delete/' + id, {
          headers: this.headers
        });
    }
    // ******************Articles */
    addArticle(article: FormData) {
        return this.http.post<ServerOut>(this._URL + '/article/add', article , {
          headers: this.headers,
          reportProgress: true,
          observe: 'events'
        });
    }
    editArticle(article: FormData) {
      return this.http.post<ServerOut>(this._URL + '/article/edit', article , {
        headers: this.headers,
        reportProgress: true,
        observe: 'events'
      });
    }
    deleteArticle(id) {
      return this.http.delete<ServerOut>(this._URL + '/article/delete/' + id, {headers: this.headers});
    }

    // ********************Actualite */
    addActualite(actualite: FormData) {
        return this.http.post<ServerOut>(this._URL + '/actualite/add', actualite, {
          headers: this.headers,
          reportProgress: true,
          observe: 'events'
        });
    }
    editActualite (actualite: FormData) {
        return this.http.post<ServerOut>(this._URL + '/actualite/edit', actualite, {
          headers: this.headers,
          reportProgress: true,
          observe: 'events'
        });
    }
    deleteActualite( id ) {
      return this.http.delete<ServerOut>(this._URL + '/actualite/delete/' + id, {headers: this.headers});
    }
    // **************Animations */
    addAnimation(animation) {
      return this.http.post<ServerOut>(this._URL + '/animation_sc/add', animation,  {headers: this.headers});
    }
    editAnimation(animation) {
      return this.http.put<ServerOut>(this._URL + '/animation_sc/edit', animation,  {headers: this.headers});
    }
    deleteAnimation(id) {
      return this.http.delete<ServerOut>(this._URL + '/animation_sc/delete/' + id, {headers: this.headers});
    }
}

interface ServerOut {
    success: boolean;
    auteurId: number;
    gpeDeRechId: number;
    articleId: number;
    actualiteId: number;
    animationId: number;
    message: string;
}
