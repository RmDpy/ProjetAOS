import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosMembreService {

  private membreUrl = 'api/membre';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.membreUrl);
  }

  setData(data:any): any {
    return this.http.post(this.membreUrl, data);
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.membreUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.membreUrl + '/' + id, data);
  }
}
