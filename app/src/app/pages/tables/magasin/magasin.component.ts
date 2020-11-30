import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IMagasinTab } from 'app/@core/data/aos_data_models/magasin.model';
import { IStockTab } from 'app/@core/data/aos_data_models/stock.model';
import { IHistoriqueTab } from 'app/@core/data/aos_data_models/historique.model';
import { AosStockService } from 'app/@core/data/aos_data_services/aos-stock.service';
import { AosHistoriqueService } from 'app/@core/data/aos_data_services/aos-historique.service';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosMagasinService } from 'app/@core/data/aos_data_services/aos-magasin.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss'],
})
export class MagasinComponent implements OnInit {

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
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      site: {
        title: 'Site',
        type: 'string',
        width: '15%',
      },
      pays: {
        title: 'Pays',
        type: 'string',
        width: '10%',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
        width: '15%',
      },
      stock_val: {
        title: 'Valeur du stock (€)',
        type: 'string',
        width: '15%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IMagasinTab;
  alert: object;
  isAlertTriggered: boolean;
  
  constructor(private service: AosMagasinService, private stock: AosStockService, private error: AosErrorService, private historique: AosHistoriqueService) { }

  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.service.getData()
    .subscribe(
      (res: IMagasinTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET MAGASINS : " + err.statusText);
    });
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer ce magasin ?')) {

      this.stock.deleteMagasinData(event.data.magasin)
        .subscribe(
          (res: IStockTab) => {
            this.onClosingAlert();
            console.log("delete magasin success");
        },(err: HttpErrorResponse) => {       
            event.confirm.reject();                      
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "DELETE STOCK : " + err.statusText);
        });

        this.historique.updateMagasinData(event.data.magasin, event.data)
          .subscribe(
            (res: IHistoriqueTab) => {
              this.onClosingAlert();
              console.log("delete magasin success");
          },(err: HttpErrorResponse) => {       
              event.confirm.reject();                      
              this.isAlertTriggered = true;                             
              this.alert = this.error.errorHandler(err.status, "DELETE STOCK : " + err.statusText);
          });

      this.service.deleteData(event.data._id)
        .subscribe(
          (res: IMagasinTab) => {
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
            this.onClosingAlert();
        },(err: HttpErrorResponse) => {       
            event.confirm.reject();                      
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "DELETE MAGASISN : " + err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }
  
  onCreateConfirm(event): void {
    this.service.setData(event.newData)
      .subscribe(
        (res: IMagasinTab) => {
          event.confirm.resolve(event.newData);
          this.source.refresh();
          this.onClosingAlert();
        },(err: HttpErrorResponse) => {  
          event.confirm.reject();                           
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "SET MAGASIN : " + err.statusText);
        });
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe(
        (res: IMagasinTab) => {
          event.confirm.resolve(event.newData);
          this.source.update(event.data, event.newData);
          this.onClosingAlert();
      },(err: HttpErrorResponse) => {
          event.confirm.reject();                             
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "UPDATE MAGASIN : " + err.statusText);
      });
  }

}
