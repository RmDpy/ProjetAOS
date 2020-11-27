import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IHistoriqueTab } from 'app/@core/data/aos_data_models/historique.model';
import { ITransfertTab } from 'app/@core/data/aos_data_models/transfert.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosHistoriqueService } from 'app/@core/data/aos_data_services/aos-historique.service';
import { AosTransfertService } from 'app/@core/data/aos_data_services/aos-transfert.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales

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
        type: 'number',
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
      emplacement: {
        title: 'Emplacement',
        type: 'string',
        width: '10%',
      },
      auteur: {
        title: 'Auteur',
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

  constructor(private service: AosTransfertService, private historique: AosHistoriqueService, private error: AosErrorService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe(
      (res: ITransfertTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, err.statusText);
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
          this.alert = this.error.errorHandler(err.status, err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.setData(event.newData)
      .subscribe(
        (res: ITransfertTab) => {
        if(res.STATUS === 'SUCCESS'){
          event.confirm.resolve(event.newData);
          var newEntry = this.generateDataHistorique(event.newData, "Entrée");
          this.onCreateHistorique(newEntry);
          var newSortie = this.generateDataHistorique(event.newData, "Sortie");
          this.onCreateHistorique(newSortie);
        } else {
          event.confirm.reject();
        }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, err.statusText);
      });
  }

  generateDataHistorique(dataTransfert, typeMouvement): object {
    var dataHistorique = {
      "reference": dataTransfert.reference,
      "libelle": dataTransfert.libelle,
      "mouvement": typeMouvement,
      "quantite": dataTransfert.quantite,
      "magasin": "undefined",
      "emplacement": dataTransfert.emplacement,
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
      .subscribe((res: IHistoriqueTab) => {
        console.log('Historique : ' + res.STATUS);
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
        this.alert = this.error.errorHandler(err.status, err.statusText);
      });
    }
  }
