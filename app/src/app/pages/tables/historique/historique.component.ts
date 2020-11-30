import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IHistoriqueTab } from 'app/@core/data/aos_data_models/historique.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosHistoriqueService } from 'app/@core/data/aos_data_services/aos-historique.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales

@Component({
  selector: 'ngx-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
})
export class HistoriqueComponent implements OnInit {

  settings = {
    add: false,
    actions: false,
    columns: {
      date: {
        title: 'Date',
        type: 'string',
      },
      reference: {
        title: 'Référence',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      mouvement: {
        title: 'Mouvement',
        type: 'html',
        valuePrepareFunction: ((mouvement) => {
          return `<div class="${this.getCellClass(mouvement)}"><strong>${mouvement}</strong></div>`;
        }),
      },
      quantite: {
        title: 'Qté',
        type: 'number',
        width: '5%',
      },
      magasin: {
        title: 'Magasin',
        type: 'string',
      },
      emplacement: {
        title: 'Emplacement',
        type: 'string',
        width: '10%',
      },
      num_bon: {
        title: 'Bon n°',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IHistoriqueTab;
  alert: object;
  isAlertTriggered: boolean;

  constructor(private service: AosHistoriqueService, private error: AosErrorService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false; 
    this.service.getData() //Traces de mouvements indélébiles = Historique charge les datas. Pas d'altération possible EDIT/DELETE
    .subscribe(
      (res: IHistoriqueTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, err.statusText);
    });
  }

  getCellClass(typeMouvement): string{
    if(typeMouvement === "Entrée")
      return "inStock";
    if(typeMouvement === "Sortie")
    return "outStock";
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

}
