import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosStockService {

  private stockUrl = 'api/stock';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.stockUrl);
  }

  setData(data: any): any {
    return this.http.post(this.stockUrl, data);
  }

  deleteData(id: any): any {
    return this.http.delete(this.stockUrl + '/' + id);
  }

  updateData(id: any, data: any): any {
    return this.http.put(this.stockUrl + '/' + id, data);
  }
}
