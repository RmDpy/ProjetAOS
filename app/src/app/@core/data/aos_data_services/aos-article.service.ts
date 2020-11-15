import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosArticleService {

  private articleUrl = 'api/article';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.articleUrl)
  }

  setData(data:any): any {
    return this.http.post(this.articleUrl, data);
  }

  deleteData(id:any): any {
    console.log(id);
    return this.http.delete(this.articleUrl + '/' + id);
  }

  updateData(id:any, data:any): any {
    return this.http.put(this.articleUrl + '/' + id, data);
  }
}
