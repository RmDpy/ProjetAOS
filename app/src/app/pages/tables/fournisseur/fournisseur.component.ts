import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IFournisseurTab } from 'app/@core/data/aos_data_models/fournisseur.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosFournisseurService } from 'app/@core/data/aos_data_services/aos-fournisseur.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales

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
      etat: {
        title: 'État',
        type: 'string',
        width: '5%',
      },
      pays: {
        title: 'Pays',
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

  constructor(private service: AosFournisseurService, private error: AosErrorService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe(
      (res: IFournisseurTab) => {
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
          (res: IFournisseurTab) => {
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
        (res: IFournisseurTab) => {
        if(res.STATUS === 'SUCCESS'){
          event.confirm.resolve(event.newData);
          this.source.refresh();
        } else {
          event.confirm.reject();
        }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, err.statusText);
      });
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe((res: IFournisseurTab) => {
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
