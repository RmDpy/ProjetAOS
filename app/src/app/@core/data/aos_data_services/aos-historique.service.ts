import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosHistoriqueService {

  private historiqueUrl = 'api/historique'; 

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.historiqueUrl)
  }

  setData(data:any): any {
    return this.http.post(this.historiqueUrl, data);
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.historiqueUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.historiqueUrl + '/' + id, data);
  }
}
