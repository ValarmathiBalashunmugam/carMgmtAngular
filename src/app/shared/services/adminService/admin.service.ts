import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Login } from 'src/app/Model/Login';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Admin } from 'src/app/Model/Admin';

@Injectable()
export class AdminService {

  private baseUrl = '';
  httpOptions: {
    headers?: HttpHeaders;
    params?: HttpParams;
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/admins';
    this.httpOptions = {

      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
  }


  createAdmin(admin: Admin): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register', admin, this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }
  // http://localhost:8080/api/admins/fetch?page=1&size=2

  getAdminsList(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/fetch?page=1&size=2', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getAdmin(email: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/' + email + '/get', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getAdminById(id: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/' + id + '/getById', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  updateAdmin(id: string, admin: Admin) {
    return this.httpClient.put(this.baseUrl + id + '/update/', admin, this.httpOptions);
  }

  // deleteAdmin(id: number): Observable<any> {
  //   return this.httpClient.delete(this.baseUrl + '/' + id + '/delete', { responseType: 'text' });
  // }

  extractData(res: Response): any {
    const body: any = res;
    return body || {};
  }

  handleError(error: Response | any): any {
    return error.message;
  }

}
