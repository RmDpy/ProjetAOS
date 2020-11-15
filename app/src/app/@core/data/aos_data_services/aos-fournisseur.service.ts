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

  setData(data:any): any {
    return this.http.post(this.fournisseurUrl, data);
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.fournisseurUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.fournisseurUrl + '/' + id, data);
  }
}
