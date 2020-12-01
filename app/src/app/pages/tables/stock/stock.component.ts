import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IArticleTab } from 'app/@core/data/aos_data_models/article.model';
import { IMagasinTab } from 'app/@core/data/aos_data_models/magasin.model';
import { IStockTab } from 'app/@core/data/aos_data_models/stock.model';
import { AosArticleService } from 'app/@core/data/aos_data_services/aos-article.service';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosMagasinService } from 'app/@core/data/aos_data_services/aos-magasin.service';
import { AosStockService } from 'app/@core/data/aos_data_services/aos-stock.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-Stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      magasin: {
        title: 'Magasin',
        type: 'string',
      },
      emplacement: {
        title: 'Emplacement',
        type: 'string',
        width:'10%',
      },
      reference: {
        title: 'Référence',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      stock_qt: {
        title: 'Quantité',
        type: 'number',
        width: '5%',
      },
      stock_val: {
        title: 'Valeur (€)',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IStockTab;
  alert: object;
  isAlertTriggered: boolean;

  constructor(private service: AosStockService, private error: AosErrorService, private article: AosArticleService, private magasin: AosMagasinService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.service.getData()
      .subscribe(
        (res: IStockTab) => {
        this.onClosingAlert();
        this.sourceRes$ = res;
        this.source.load(this.sourceRes$.DATA);
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "GET STOCKS : " + err.statusText);
      });
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe(
          (res: IStockTab) => {
            this.onClosingAlert();
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
        },(err: HttpErrorResponse) => {
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "DELETE STOCK : " + err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.magasin.getDataMagasin(event.newData.magasin)
      .subscribe(
        (magasinRes: IMagasinTab) => {
        this.onClosingAlert();
        if(magasinRes.DATA === null){
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun magasin connu.");
        } else {
          this.article.getDataReference(event.newData.reference)
          .subscribe(
            (articleRes: IArticleTab) => {
            this.onClosingAlert();
            if(articleRes.DATA === null){
              this.isAlertTriggered = true;                             
              this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun article connu.");
            } else {
              this.service.setData(event.newData)
              .subscribe(
                (res: IStockTab) => {
                  this.onClosingAlert();
                  // @ts-ignore
                  event.newData.stock_val = event.newData.stock_qt * articleRes.DATA.prix;
                  event.confirm.resolve(event.newData);
              },(err: HttpErrorResponse) => {
                  event.confirm.reject();
                  this.isAlertTriggered = true;                             
                  this.alert = this.error.errorHandler(err.status, "SET STOCK : " + err.statusText);
              });
            }
          },(err: HttpErrorResponse) => {
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "GET ARTICLE : " + err.statusText);
          });
        }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "GET MAGASIN : " + err.statusText);
      });
  }

  onEditConfirm(event): void {
    this.article.getDataReference(event.newData.reference)
    .subscribe(
      (articleRes: IArticleTab) => {
      this.onClosingAlert();
      if(articleRes.DATA === null){
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun article connu.");
      } else {
        // @ts-ignore
        event.newData.stock_val = event.newData.stock_qt * articleRes.DATA.prix;
        this.service.updateData(event.data._id, event.newData)
        .subscribe(
          (res: IStockTab) => {
            this.onClosingAlert();
            event.confirm.resolve(event.newData);
            this.source.update(event.data, event.newData);
        },(err: HttpErrorResponse) => {
          event.confirm.reject();
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "UPDATE STOCK : " + err.statusText);
        });
      }
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET ARTICLE : " + err.statusText);
    });
  }
}
