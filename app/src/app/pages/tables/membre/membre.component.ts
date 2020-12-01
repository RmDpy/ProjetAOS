import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IMembreTab } from 'app/@core/data/aos_data_models/membre.model';
import { IRoleTab } from 'app/@core/data/aos_data_models/role.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosMembreService } from 'app/@core/data/aos_data_services/aos-membre.service';
import { AosRoleService } from 'app/@core/data/aos_data_services/aos-role.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.scss'],
})
export class MembreComponent implements OnInit {

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
      utilisateur: {
        title: 'Utilisateur',
        type: 'string',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      role: {
        title: 'Rôle',
        type: 'string',
      },
      organisation: {
        title: 'Organisation',
        type: 'string',
        width: '10%',
      },
      date_fin: {
        title: 'Fin de validité',
        type: 'date',
      },
      etat: {
        title: 'Etat',
        type: 'string',
        width: '5%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IMembreTab;
  alert: object;
  isAlertTriggered: boolean;

  constructor(private service: AosMembreService, private role: AosRoleService, private error: AosErrorService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false;  
    this.service.getData()
    .subscribe((res: IMembreTab) => {
      this.onClosingAlert();
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET MEMBRES : " + err.statusText);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe(
          (res: IMembreTab) => {
            this.onClosingAlert();
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
        },(err: HttpErrorResponse) => {
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "DELETE MEMBRE : " + err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.role.getDataRole(event.newData.role)
      .subscribe((res: IRoleTab) => {
        if(res.DATA === null){
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun role connu.");
        } else {
          this.onClosingAlert();
          this.service.setData(event.newData)
          .subscribe(
            (res: IMembreTab) => {
              event.confirm.resolve(event.newData);
          },(err: HttpErrorResponse) => {
              event.confirm.reject();
              this.isAlertTriggered = true;                             
              this.alert = this.error.errorHandler(err.status, "SET MEMBRE : " + err.statusText);
          });
        }
      },(err: HttpErrorResponse) => {
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "GET ROLE : " + err.statusText);
      });
  }

  onEditConfirm(event): void {
    this.role.getDataRole(event.newData.role)
    .subscribe((res: IRoleTab) => {
      if(res.DATA === null){
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(418, "Les informations données ne correspondent à aucun role connu.");
      } else {
        this.onClosingAlert();
        this.service.updateData(event.data._id, event.newData)
        .subscribe(
          (res: IMembreTab) => {
            event.confirm.resolve(event.newData);
            this.source.update(event.data, event.newData);
        },(err: HttpErrorResponse) => {
            event.confirm.reject();
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, "UPDATE MEMBRE : " + err.statusText);
        });
      }
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET ROLE : " + err.statusText);
    });
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

}