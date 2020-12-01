import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosFournisseurService {

  private fournisseurUrl = 'api/fournisseur';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.fournisseurUrl)
  }

  getDataCode(code: any): any {
    return this.http.get(this.fournisseurUrl + '/query/' + code);
  }

  setData(data:any): any {
    return this.http.post(this.fournisseurUrl, data);
  }

  deleteData(id:any): any {
    return this.http.delete(this.fournisseurUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.fournisseurUrl + '/' + id, data);
  }
}
