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

  dataStock = {
    "_id": String,
    "magasin": String,
    "emplacement": String,
    "etat": String,
    "reference": String,
    "libelle": String,
    "prix": Number,
    "stock_qt": Number,
    "stock_val": Number,
  };

  constructor(private service: AosTransfertService, private stock: AosStockService, private historique: AosHistoriqueService, private error: AosErrorService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.dataStock = null;
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
    this.service.setData(event.newData)
      .subscribe(
        (res: ITransfertTab) => {
          event.confirm.resolve(event.newData);
          var newSortie = this.generateDataHistorique(event.newData, "Sortie");
          var newEntree = this.generateDataHistorique(event.newData, "Entrée");
          var newStock = this.verifyCalcNewStock(newEntree, newSortie, event.newData.quantite);
          //console.log(newStock);
          if(newStock){
            this.onCreateHistorique(newSortie);
            this.onCreateHistorique(newEntree);
          } else {
            event.confirm.reject();
          }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "SET TRANSFERT : " + err.statusText);
      });
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

  onUpdateStock(dataStockID, dataStock): void {
    this.stock.updateData(dataStockID, dataStock)
      .subscribe(
        (res: IStockTab) => {
          console.log(res.STATUS);
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "UPDATE STOCK : " + err.statusText);
      });  
  }

  verifyCalcNewStock(dataEntree, dataSortie, quantiteTransfert): boolean { //Coincé ici
    var is_stock_valid = false;
    console.log(JSON.stringify(this.dataStock));
    var testingDataEntree = this.getDataStock(dataEntree.reference, dataEntree.magasin); //Je voudrais récup mon objet
    var testingDataSortie = this.getDataStock(dataEntree.reference, dataEntree.magasin);
    console.log(JSON.stringify(testingDataEntree)); //Et checker si c'est ok ici pour les opérations plus bas
    /*if (quantiteTransfert <= dataSortie.stock_qt)
      is_stock_valid = true;
    else if (quantiteTransfert > dataStockSortie.stock_qt)
      is_stock_valid = false;
    if(is_stock_valid){
      dataStockSortie.stock_qt = dataStockSortie.stock_qt - quantiteTransfert;
      dataStockEntree.stock_qt = +dataStockEntree.stock_qt + +quantiteTransfert;
      this.onUpdateStock(dataStockEntree, dataSortie);
      this.onUpdateStock(dataStockSortie, dataEntree);
    } else {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(418, "Le stock du magasin fournisseur est trop faible pour cette opération.");
    }*/
    return is_stock_valid;
  }

  getDataStock(dataReference, dataMagasin): void{
    var sourceStockRes$;
    this.stock.getDataID(dataReference, dataMagasin)
      .subscribe(
        (res: IStockTab) => {
          sourceStockRes$ = res;
          if(sourceStockRes$.DATA === null){
            this.dataStock = null;
            this.isAlertTriggered = true;                            
            this.alert = this.error.errorHandler(418, "Les informations fournies ne correspondent à aucun stock existant.");
          } else {
            this.dataStock._id = sourceStockRes$.DATA._id;
            this.dataStock.magasin = sourceStockRes$.DATA.magasin;
            this.dataStock.emplacement = sourceStockRes$.DATA.emplacement;
            this.dataStock.etat = sourceStockRes$.DATA.etat;
            this.dataStock.reference = sourceStockRes$.DATA.reference;
            this.dataStock.libelle = sourceStockRes$.DATA.libelle;
            this.dataStock.prix = sourceStockRes$.DATA.prix;
            this.dataStock.stock_qt = sourceStockRes$.DATA.stock_qt;
            this.dataStock.stock_val = sourceStockRes$.DATA.stock_val;
          }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                           
        this.alert = this.error.errorHandler(err.status, "GET STOCK : " + err.statusText);
      });
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
