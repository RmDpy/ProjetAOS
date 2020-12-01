import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IFournisseurTab } from 'app/@core/data/aos_data_models/fournisseur.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosFournisseurService } from 'app/@core/data/aos_data_services/aos-fournisseur.service';
import { AosArticleService } from 'app/@core/data/aos_data_services/aos-article.service';
import { IArticleTab } from 'app/@core/data/aos_data_models/article.model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent implements OnInit {

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
      code: {
        title: 'Cage Code',
        type: 'string',
        width: '10%',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      pays: {
        title: 'Pays/Etat',
        type: 'string',
        width: '15%',
      },
      devise: {
        title: 'Devise',
        type: 'string',
        width: '15%',
      },
      fabriquant: {
        title: 'Fabricant',
        type: 'boolean',
        width: '5%',
      },
      sav: {
        title: 'SAV',
        type: 'boolean',
        width: '5%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IFournisseurTab;
  alert: object;
  isAlertTriggered: boolean;

  constructor(private service: AosFournisseurService, private error: AosErrorService, private article: AosArticleService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.service.getData()
    .subscribe(
      (res: IFournisseurTab) => {
      this.onClosingAlert();
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET FOURNISSEURS : " + err.statusText);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      console.log();
      this.article.updateFournisseurData(event.data.code, event.data)
        .subscribe(
          (res: IArticleTab) => {
            this.onClosingAlert();
        },(err: HttpErrorResponse) => {       
            event.confirm.reject();                      
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "DELETE ARTICLE : " + err.statusText);
        });

      this.service.deleteData(event.data._id)
        .subscribe(
          (res: IFournisseurTab) => {
            this.onClosingAlert();
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
        },(err: HttpErrorResponse) => {
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "DELETE FOURNISSEUR : " + err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.setData(event.newData)
      .subscribe(
        (res: IFournisseurTab) => {
          this.onClosingAlert();
          event.confirm.resolve(event.newData);
          this.source.refresh();
      },(err: HttpErrorResponse) => {
          event.confirm.reject();
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "SET FOURNISSEUR : " + err.statusText);
      });
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe(
        (res: IFournisseurTab) => {
          this.onClosingAlert();
          event.confirm.resolve(event.newData);
          this.source.update(event.data, event.newData);
      },(err: HttpErrorResponse) => {
          event.confirm.reject();
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "UPDATE FOURNISSEUR : " + err.statusText);
      });
    }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

}
