import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IStockTab } from 'app/@core/data/aos_data_models/stock.model';
import { ITransfertTab } from 'app/@core/data/aos_data_models/transfert.model';
import { IHistoriqueTab } from 'app/@core/data/aos_data_models/historique.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosHistoriqueService } from 'app/@core/data/aos_data_services/aos-historique.service';
import { AosStockService } from 'app/@core/data/aos_data_services/aos-stock.service';
import { AosTransfertService } from 'app/@core/data/aos_data_services/aos-transfert.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss'],
})
export class TransfertComponent implements OnInit {

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
      reference: {
        title: 'Référence',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      quantite: {
        title: 'Quantité',
        type: 'number',
        width: '5%',
      },
      mag_fournisseur: {
        title: 'Magasin Fournisseur',
        type: 'string',
      },
      mag_demandeur: {
        title: 'Magasin Demandeur',
        type: 'string',
      },
      num_bon: {
        title: 'N°Bon',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: ITransfertTab;
  alert: object;
  isAlertTriggered: boolean;

  constructor(private service: AosTransfertService, private stock: AosStockService, private historique: AosHistoriqueService, private error: AosErrorService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.service.getData()
    .subscribe(
      (res: ITransfertTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET TRANSFERT : " + err.statusText);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe(
          (res: ITransfertTab) => {
          if(res.STATUS === 'SUCCESS'){
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
          }
        },(err: HttpErrorResponse) => {
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "DELETE TRANSFERT : " + err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    var newSortie = this.generateDataHistorique(event.newData, "Sortie");
    var newEntree = this.generateDataHistorique(event.newData, "Entrée");
    this.verifyCalcNewStock(event, newEntree, newSortie, event.newData.quantite);
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

  generateDataHistorique(dataTransfert, typeMouvement): object {

    var dataHistorique = {
      "reference": dataTransfert.reference,
      "libelle": dataTransfert.libelle,
      "mouvement": typeMouvement,
      "quantite": dataTransfert.quantite,
      "magasin": String,
      "emplacement": "TESO",
      "num_bon": dataTransfert.num_bon
    };

    if(typeMouvement === "Entrée")
      dataHistorique.magasin = dataTransfert.mag_demandeur;
    if(typeMouvement === "Sortie")
      dataHistorique.magasin = dataTransfert.mag_fournisseur;

    return dataHistorique;
  }

  onCreateHistorique(dataTransfert): void {
    this.historique.setData(dataTransfert)
      .subscribe(
        (res: IHistoriqueTab) => {
          console.log(res.STATUS);
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "SET HISTORIQUE : " + err.statusText);
      });  
  }

  onCreateTransfert(eventTransfert): void{
    this.service.setData(eventTransfert.newData)
    .subscribe(
      (res: ITransfertTab) => {
        eventTransfert.confirm.resolve(eventTransfert.newData);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "SET TRANSFERT : " + err.statusText);
    });
  }

  onUpdateStock(dataStock): void {
    this.stock.updateData(dataStock._id, dataStock)
      .subscribe(
        (res: IStockTab) => {
          console.log(res.STATUS);
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "UPDATE STOCK : " + err.statusText);
      });  
  }

  verifyCalcNewStock(eventTransfert, dataEntree, dataSortie, quantiteTransfert): void { //Coincé ici
    this.stock.getDataID(dataSortie.reference, dataSortie.magasin)
      .subscribe(
        (resSortie: IStockTab) => {
          this.stock.getDataID(dataEntree.reference, dataEntree.magasin)
            .subscribe(
              (resEntree: IStockTab) => {
              if(resEntree.DATA === null || resSortie.DATA === null){
                this.isAlertTriggered = true;                            
                this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun stock connu.");
              } else {
                  // @ts-ignore
                if(this.verifyValidtyStock(resSortie.DATA.stock_qt, quantiteTransfert)){
                  // @ts-ignore
                  resSortie.DATA.stock_qt = resSortie.DATA.stock_qt - quantiteTransfert;
                  // @ts-ignore
                  resEntree.DATA.stock_qt = +resEntree.DATA.stock_qt + +quantiteTransfert;
                  //Update les Stocks
                  this.onUpdateStock(resSortie.DATA);
                  this.onUpdateStock(resEntree.DATA);
                  //Generate les Mouvements
                  this.onCreateHistorique(dataEntree);
                  this.onCreateHistorique(dataSortie);
                  //Generate Transferts
                  this.onCreateTransfert(eventTransfert);
                } else {
                  this.isAlertTriggered = true;                            
                  this.alert = this.error.errorHandler(418, "Le stock du magasin fournisseur est trop faible pour cette opération.");
                }
              }
            },(err: HttpErrorResponse) => {
              this.isAlertTriggered = true;                           
              this.alert = this.error.errorHandler(err.status, "GET MAGASIN DEMANDEUR : " + err.statusText);
            }); //fin du second subscribe
        },(err: HttpErrorResponse) => {
          this.isAlertTriggered = true;                           
          this.alert = this.error.errorHandler(err.status, "GET MAGASIN FOURNISSEUR : " + err.statusText);
        }); //fin du premier subscribe
  }

  verifyValidtyStock(quantiteStock, quantiteTransfert): boolean{
    var is_stock_valid: boolean;
    if (quantiteTransfert <= quantiteStock)
      is_stock_valid = true;
    else if (quantiteTransfert > quantiteStock)
      is_stock_valid = false;
    return is_stock_valid;
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe(
        (res: ITransfertTab) => {
        if(res.STATUS === 'SUCCESS'){
          event.confirm.resolve(event.newData);
          this.source.update(event.data, event.newData);
        } else {
          event.confirm.reject();
        }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "EDIT TRANSFERT : " + err.statusText);
      });
    }
  }
