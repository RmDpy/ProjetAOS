import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosRoleService {

  private roleUrl = 'api/role';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.roleUrl);
  }

  setData(data:any): any {
    return this.http.post(this.roleUrl, data);
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.roleUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.roleUrl + '/' + id, data);
  }
}
