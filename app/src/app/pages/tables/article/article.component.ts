import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IArticleTab } from 'app/@core/data/aos_data_models/article.model';
import { AosArticleService } from 'app/@core/data/aos_data_services/aos-article.service';
import { AosFournisseurService } from 'app/@core/data/aos_data_services/aos-fournisseur.service';
import { IFournisseurTab } from 'app/@core/data/aos_data_models/fournisseur.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

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
      fournisseur: {
        title: 'Fournisseur',
        type: 'string',
        width: '10%',
      },
      etat: {
        title: 'État',
        type: 'string',
        width: '5%',
      },
      organisation: {
        title: 'Organisation',
        type: 'string',
      },
      prix: {
        title: 'Prix Standard (€)',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IArticleTab;
  alert: object;
  isAlertTriggered: boolean;

  constructor(private service: AosArticleService, private error: AosErrorService, private fournisseur: AosFournisseurService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.service.getData()
    .subscribe(
      (res: IArticleTab) => {
      this.onClosingAlert();
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET ARTICLES : " + err.statusText);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe(
          (res: IArticleTab) => {
            this.onClosingAlert();
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
        },(err: HttpErrorResponse) => {
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "DELETE ARTICLE : " + err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.fournisseur.getDataCode(event.newData.fournisseur)
    .subscribe(
      (resFournisseur: IFournisseurTab) => {
      if(resFournisseur.DATA === null){
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun fournisseur connu.");
      } else {
        this.onClosingAlert();
        this.service.setData(event.newData)
        .subscribe(
          (res: IArticleTab) => {
            event.confirm.resolve(event.newData);
        },(err: HttpErrorResponse) => {
            event.confirm.reject();
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "SET ARTICLE : " + err.statusText);
        });
      }
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET FOURNISSEUR : " + err.statusText);
    });
  }

  onEditConfirm(event): void {
    this.fournisseur.getDataCode(event.newData.fournisseur)
      .subscribe(
        (resFournisseur: IFournisseurTab) => {
          if(resFournisseur.DATA === null){
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun fournisseur connu.");
          } else {
            this.onClosingAlert();
            this.service.updateData(event.data._id, event.newData)
              .subscribe(
                (res: IArticleTab) => {
                  event.confirm.resolve(event.newData);
                  this.source.update(event.data, event.newData);
              },(err: HttpErrorResponse) => {
                  this.isAlertTriggered = true;                             
                  this.alert = this.error.errorHandler(err.status, "UPDATE ARTICLE : " + err.statusText);
              });
          }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "GET FOURNISSEUR : " + err.statusText);
      });
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

}
