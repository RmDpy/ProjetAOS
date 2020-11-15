import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosTransfertService {

  private transfertUrl = 'api/transfert'; 

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.transfertUrl)
  }

  setData(data:any): any {
    return this.http.post(this.transfertUrl, data);
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.transfertUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.transfertUrl + '/' + id, data);
  }
}
