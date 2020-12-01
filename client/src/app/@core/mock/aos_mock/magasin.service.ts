import { Injectable } from '@angular/core';
import { MagasinData } from '../../data/aos_data/magasin';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import obligatoire pour manipuler HTTP
import { Observable, of } from 'rxjs'; // Import obligatoire pour manipuler HTTP selon la doc
import { catchError, map, tap } from 'rxjs/operators'; // idem

@Injectable()
export class MagasinService extends MagasinData { // Le service qui permet de gérer nos datas.

  private magasinUrl = 'api/magasin';  // URL utilisée pour communiquer avec l'API
                                        // api/magasin get tout

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {
    super();
  }

  getMagasin(id: string): Observable<any> {
    const url = `${this.magasinUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.myLog(`fetched magasin id=${id}`)),
      catchError(this.handleError<any>(`getMagasin id=${id}`)),
    );
  }

  data = [{
    magasin: 'CERGY_ENTREPOT',
    libelle: 'Stock Cergy',
    site: 'Cergy',
    pays: 'France',
    responsable: 'LeuNoeleeste',
    stock_val: '120 euros',
  }, {
    magasin: 'NICE_ENTREPOT',
    libelle: 'Stock Nice',
    site: 'Nice',
    pays: 'France',
    responsable: 'Spames',
    stock_val: '420 euros',
  }, {
    magasin: 'EVRY_ENTREPOT',
    libelle: 'Stock Evry',
    site: 'Evry',
    pays: 'Mali',
    responsable: 'Courtaud',
    stock_val: '30 euros',
  }];

  getData(): any {
    return this.http.get<any>('/api/magasin')
      .subscribe((res: any) => {
        const resS = JSON.stringify(res);
        const tab = resS.split('[');
        const resA = tab[1] + tab[2] + tab[3] + tab[4];
        const resF = resA.substr(0, resA.length - 2);
        const res2 = "[" + resF + "]";
        console.log(res2);
        return res2;
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.myLog('${operation} failed: ${error.message}');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private myLog(message: string) {
    console.log('${message}');
  }

}
