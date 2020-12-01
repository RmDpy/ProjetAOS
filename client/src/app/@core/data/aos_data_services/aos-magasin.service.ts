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
    return this.http.get(this.magasinUrl);
  }

  getDataMagasin(magasin: any): any {
    return this.http.get(this.magasinUrl + '/query/' + magasin);
  }

  setData(data:any): any {
    return this.http.post(this.magasinUrl, data);
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.magasinUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.magasinUrl + '/' + id, data);
  }
}
