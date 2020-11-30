import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosHistoriqueService {

  private historiqueUrl = 'api/historique';
  private transfertData: object; //Permet de faire communiquer les components Historique et Transfert

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  getData(): any {
    return this.http.get(this.historiqueUrl)
  }

  getDataID(date, reference, magasin, quantite): any {
    return this.http.get(this.historiqueUrl + '/query/' + date + '/' + reference + magasin + '/' + quantite);
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

  generateDateNow(date_ob): string{
    // adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    //final result
    return day + "-" + month + "-" + year + " (" + hours + ":" + minutes + ":" + seconds + ")";
  }
}
