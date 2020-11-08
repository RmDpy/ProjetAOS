import { Injectable } from '@angular/core';
import { MagasinData } from '../../data/aos_data/magasin';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Import obligatoire pour manipuler HTTP
import { Observable, of } from 'rxjs'; //Import obligatoire pour manipuler HTTP selon la doc
import { catchError, map, tap } from 'rxjs/operators'; //idem

@Injectable()
export class MagasinService extends MagasinData { //Le service qui permet de gérer nos datas. C'est ici que je chie du sang.

  private magasinUrl = 'api/magasin';  //URL utilisée pour communiquer avec l'API - localhost:4200/api/magasin = get tous les magasins

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; //J'ai suvi la doc Angular (je l'ai mise dans le README)
  courses$: Observable<any[]>; //Inutile, simple variable de test pour controler ce que fait ma méthode getMagasin

  constructor(private http: HttpClient) { //Constructeur inutile, c'était pour mes tests, et rendre http dispo dans le tout le foutoir
  	super(); //inutile aussi, mais puisque héritage j'étais forcé de déclarer super();
  }

  getMagasin(id: string): Observable<any> { //Le coeur du boulot, définir une méthode permettant de get mes magasins définis en DB. J'ai suivi la fucking doc again.
    const url = `${this.magasinUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.myLog(`fetched magasin id=${id}`)),
      catchError(this.handleError<any>(`getMagasin id=${id}`))
    );
  }

  data = [{ //Les Dummy Datas actuellement utilisées. La finalité c'est de renvoyer un tableau identique dans getData, mais issue d'un http.get obviously
    magasin: 'CERGY_ENTREPOT',
    libelle: 'Stock Cergy',
    site: 'Cergy',
    pays: 'France',
    responsable: 'LeuNoeleeste',
    stock_val: '120 euros',
  },{
    magasin: 'NICE_ENTREPOT',
    libelle: 'Stock Nice',
    site: 'Nice',
    pays: 'France',
    responsable: 'Spames',
    stock_val: '420 euros',
  },{
    magasin: 'EVRY_ENTREPOT',
    libelle: 'Stock Evry',
    site: 'Evry',
    pays: 'Mali',
    responsable: 'Courtaud',
    stock_val: '30 euros',
  }];

  getData() { //Le diamant de la couronne. Quand t'as une methode test qui marche, il faudra la renommer getData, puisque c'est ce qui est envoyé au component
  	this.courses$ = this.getMagasin('5fa04de25e2ca7192497a4fb');
  	console.log(this.courses$); //Nope erreur en console, le test a chié pour X raison
    return this.data;
  }


//BLABLAH méthodes reprises de la doc Angular

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
