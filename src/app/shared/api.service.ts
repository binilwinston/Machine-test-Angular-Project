import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { customermodel } from '../Model/customermodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseapi :string= 'https://localhost:7043/api/Customer';
  Getallcustomer(): Observable<customermodel[]> {
    return this.http.get<customermodel[]>(this.baseapi +'/GetAllCustomers');
  }

  Createcustomer(companydata: any) {
    return this.http.post(this.baseapi+'/InsertCustomers', companydata);
  }
  Getcustomerbycode(customerCode: any): Observable<customermodel> {
    return this.http.get<customermodel>(this.baseapi + '/GetCustomersById/'+customerCode);
  }

  Removecustomerbycode(customerCode: any) {
    return this.http.delete(this.baseapi + '/DeleteCustomer/'+customerCode);
  }
  Updatecustomer(customerCode: any, companydata: any) {
    return this.http.put(this.baseapi +  '/UpdateCustomer', companydata);
  }
}
