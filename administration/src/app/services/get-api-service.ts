import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auteur } from '../models/Auteur';
import { Observable } from 'rxjs';
import { GpeDeRecherche } from '../models/gpeDeRecherche';
import { Article } from '../models/Article';
import { Actualite } from '../models/Actualite';
import {AnimationSc} from "../models/AnimationSc";
import {Urls} from "./Urls";

@Injectable()
export class GetApiService {
  private _URL = Urls._ApiURL;
  constructor(private http: HttpClient) { }

  getAuteur(): Observable<Auteur> {
    return this.http.get<Auteur>(this._URL + '/auteur');
  }
  getAuteurById(id)  {
    return this.http.get<Auteur>(this._URL + '/auteur/id/' + id);
  }
  /********************* */
  getGpeDeRech(): Observable<GpeDeRecherche> {
    return this.http.get<GpeDeRecherche>(this._URL + '/groupe_de_recherche');
  }
  /********************* */
  getArticle(): Observable<Article> {
    return this.http.get<Article>(this._URL + '/article');
  }
  /******************** */
  getActualite(): Observable<Actualite> {
    return this.http.get<Actualite>(this._URL + '/actualite');
  }
  getActualiteById(id): Observable<Actualite> {
    return this.http.get<Actualite>(this._URL + '/actualite/id/' + id);
  }
  /******************* */
  getAnimation(): Observable<AnimationSc> {
    return this.http.get<AnimationSc>(this._URL + '/animation_sc');
  }
}
