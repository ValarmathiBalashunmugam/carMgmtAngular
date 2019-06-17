import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/Model/User';

@Injectable()
export class UserServiceService {

  private baseUrl = '';
  httpOptions: {
    headers?: HttpHeaders;
    params?: HttpParams;
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/users';
    this.httpOptions = {

      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
  }

  // getUserList(): Observable<any> {
  //   return this.httpClient.get<any>(this.baseUrl + '/fetch', this.httpOptions).pipe(
  //     tap(
  //       data => this.extractData(data),
  //       error => this.handleError(error)
  //     )
  //   );
  // }

  // deleteUser(id: number): Observable<any> {
  //   return this.httpClient.delete(this.baseUrl + '/' + id + '/delete', { responseType: 'text' });
  // }

  createUser(user: User): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register', user, this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getUser(id: string): Observable<any> {
    // console.log("getUser");
    // console.log(this.httpClient.get(url));
    return this.httpClient.get(this.baseUrl + '/' + id + '/get', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getUserByEmail(email: string): Observable<any> {
    // console.log("getUser");
    // console.log(this.httpClient.get(url));
    return this.httpClient.get(this.baseUrl + '/' + email + '/getUserByEmail', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  updateUser(id, user: User) {
    return this.httpClient.put(this.baseUrl + '/' + id + '/update', user, this.httpOptions);
  }

  extractData(res: Response): any {
    const body: any = res;
    return body || {};
  }

  handleError(error: Response | any): any {
    console.log(error.message);
    return error.message;
  }
}
