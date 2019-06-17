import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { PickUpRequest } from 'src/app/Model/PickUpRequest';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PickUpService {

  private baseUrl = '';
  httpOptions: {
    headers?: HttpHeaders;
    params?: HttpParams;
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/pickUpRequests';
    this.httpOptions = {

      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
  }

  createPickUpRequest(pickUpRequest: PickUpRequest): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register', pickUpRequest, this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getPickUpRequest(email: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/' + email + '/getByEmail/', this.httpOptions).pipe(
      tap(
        data => {
          this.extractData(data);
          // console.log(data);
        },
        error => this.handleError(error)
      )
    );
  }

  getPickUpRequestById(id: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/' + id + '/getById', this.httpOptions).pipe(
      tap(
        data => {
          this.extractData(data);
          // console.log(data);
        },
        error => this.handleError(error)
      )
    );
  }


  getPickUpRequestList(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/fetch', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }
  // /{id}/update
  updatePickUpRequest(id, pickUpRequest: PickUpRequest) {
    return this.httpClient.put(this.baseUrl + '/' + id + '/update', pickUpRequest, this.httpOptions);
  }

  getRequestByDealerEmail(email: string) {
    return this.httpClient.get<any>(this.baseUrl + '/' + email + '/findByDealerEmail', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  updateStatus(id: string, status: string) {
    console.log(id);
    return this.httpClient.put<any>(this.baseUrl + '/updateStatus/' + id, status, this.httpOptions);
  }

  extractData(res: Response): any {
    const body: any = res;
    return body || {};
  }

  handleError(error: Response | any): any {
    return error.message;
  }

}
