import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/Model/Login';


@Injectable()
export class LoginService {

  private baseUrl = '';
  httpOptions: {
    headers?: HttpHeaders;
    params?: HttpParams;
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/logins';
    this.httpOptions = {

      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
  }


  createLogin(login: Login): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register', login, this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getLogin(login: Login): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/get/' + login.email + '/' + login.password, this.httpOptions).pipe(
      tap(
        data => {
          this.extractData(data);
          // console.log(data);
        },
        error => this.handleError(error)
      )
    );
  }

  // updateLogin(emailAddress: string, login: Login) {
  //   return this.httpClient.put(this.baseUrl + '/update/' + emailAddress, login, this.httpOptions);
  // }
  extractData(res: Response): any {
    const body: any = res;
    return body || {};
  }

  handleError(error: Response | any): any {
    return error.message;
  }


}
