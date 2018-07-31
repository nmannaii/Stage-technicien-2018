import {Injectable} from "@angular/core";

@Injectable()

export class Urls {
  // public static _ApiURL = 'http://51.68.70.212:3000/api';
  public static _ApiURL = 'http://localhost:3000/api';
  public static _AuthURL = 'http://localhost:3000/api/admin/login';
  public static _downloadUrl = 'http://localhost:3000/api/download';
}
