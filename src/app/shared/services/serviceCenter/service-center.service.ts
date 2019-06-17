import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/Model/Admin';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceCenter } from 'src/app/Model/ServiceCenter';

@Injectable({
  providedIn: 'root'
})
export class ServiceCenterService {

  private baseUrl = '';
  httpOptions: {
    headers?: HttpHeaders;
    params?: HttpParams;
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/serviceCenters';
    this.httpOptions = {

      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
  }


  createServiceCenter(serviceCenter: ServiceCenter): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register', serviceCenter, this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getServiceCenterList(): Observable<ServiceCenter> {
    return this.httpClient.get<any>(this.baseUrl + '/fetch', this.httpOptions).pipe(
      tap(
        data => {
          this.extractData(data);
        },
        error => this.handleError(error)
      )
    );
  }

  getserviCenter(email: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/' + email + '/get', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  extractData(res: Response): any {
    const body: any = res;
    return body || {};
  }

  handleError(error: Response | any): any {
    return error.message;
  }

}

