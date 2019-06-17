import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/Model/Bill';
import { tap } from 'rxjs/operators';

@Injectable()
export class BillService {

  private baseUrl = '';
  httpOptions: {
    headers?: HttpHeaders;
    params?: HttpParams;
  };

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/bills';
    this.httpOptions = {

      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    };
  }


  createBill(bill: Bill): Observable<any> {
    debugger
    console.log(bill);
    return this.httpClient.post<any>(this.baseUrl + '/register', bill, this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }
  
  getBillByUserEmail(email: string) {
    return this.httpClient.get<any>(this.baseUrl + '/' + email + '/findByUserEmail', this.httpOptions).pipe(
      tap(
        data => this.extractData(data),
        error => this.handleError(error)
      )
    );
  }

  getBillByDealerEmail(email: string) {
    debugger
    console.log(email);
    return this.httpClient.get<any>(this.baseUrl + '/' + email + '/findByDealerEmail', this.httpOptions).pipe(
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

