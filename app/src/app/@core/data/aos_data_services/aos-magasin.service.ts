import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosMagasinService {

  private magasinUrl = 'api/magasin';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.magasinUrl); //obvious
  }

  setData(data:any): any {
    return this.http.post(this.magasinUrl, data); //obvious
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.magasinUrl + '/' + id); //vraiment obvious
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.magasinUrl + '/' + id, data); //stop reading and get in the Code Editor Shinji
  }
}
