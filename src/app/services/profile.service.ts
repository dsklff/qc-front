import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { UserService } from './user.service';
import { Observable } from "rxjs";
import { IProfile } from '../models/IProfile';
import { MainService } from '../services/main.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  thumbnailFetchUrl : any;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  get(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    const pars = this.getUrlParams(body);
    return this.http.get(uri, {params: pars}).toPromise().then(res => res);
  }

  post(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.post(uri, body).toPromise().then(res => res);
  }

  delet(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.delete(uri, body).toPromise().then(res => res);
  }

  put(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.put(uri, body).toPromise().then(res => res);
  }

  private normalBody(body: any): any {
    if (!body) {
      body = {};
    }
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      if (body[key] instanceof Date) {
        body[key] = this.formatDate(body[key]);
      }
    }
    return body;
  }

  private getUrlParams(body: any): HttpParams {
    let params = new HttpParams();
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      params = params.append(key, body[key]);
    }
    return params;
  }

  list(){
    //return this.http.get('http://10.189.85.221:8989/api/current/');
    return this.http.get('http://127.0.0.1:8000/api/users/current/');
  }
  

  updateCategory(profile: IProfile): Promise<IProfile> {
    return this.put('http://127.0.0.1:8000/api/users/current/', {
      profile: {
        first_name: profile.first_name,
        last_name: profile.last_name,
        position: profile.position,
        dob: profile.dob,
        address: profile.address,
        country: profile.country,
        city: profile.city,
        department: profile.department,
      }
    });
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.userService.token
      })
    };
  }
}
