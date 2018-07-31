import {Injectable} from '@angular/core';


@Injectable()
export class EditDate {
  constructor() {}
  setDateSqlFormat(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes  = date.getMinutes();
    if (hours <= 9 ) {
      // @ts-ignore
      hours = '0' + hours;
    }
    if (minutes <= 9) {
      // @ts-ignore
      minutes = '0' + minutes;
    }
    if (month <= 9) {
      // @ts-ignore
      month = '0' + month;
    }
    if (day <= 9) {
      // @ts-ignore
      day = '0' + day;
    }
    return (year + '-' + month + '-' + day + ' ' + hours + ':' + minutes);
  }
}
