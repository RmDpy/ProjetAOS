import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IRoleTab } from 'app/@core/data/aos_data_models/role.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosRoleService } from 'app/@core/data/aos_data_services/aos-role.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./Role.component.scss'],
})
export class RoleComponent implements OnInit {

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
      role: {
        title: 'Rôle',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      domaine: {
        title: 'Domaine',
        type: 'string',
      },
	    droit: {
        title: 'Droit',
        type: 'string',
        width: '10%',
      },
      default: {
        title: 'Défaut',
        type: 'string',
        width: '5%',
      },
      membres: {
        title: 'Membres',
        type: 'number',
        width: '5%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IRoleTab;
  alert: object;
  isAlertTriggered: boolean;

  constructor(private service: AosRoleService, private error: AosErrorService) { }
  
  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.service.getData()
    .subscribe(
      (res: IRoleTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, "GET ROLES : " + err.statusText);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe(
        (res: IRoleTab) => {
          event.confirm.resolve(event.data);
          this.source.remove(event.data);
        },(err: HttpErrorResponse) => {
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, "DELETE ROLE : " + err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.setData(event.newData)
      .subscribe(
      (res: IRoleTab) => {
        event.confirm.resolve(event.newData);
        this.source.refresh();
      },(err: HttpErrorResponse) => {
        event.confirm.reject();
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "SET ROLE : " + err.statusText);
      });
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe(
      (res: IRoleTab) => {
        event.confirm.resolve(event.newData);
        this.source.update(event.data, event.newData);
      },(err: HttpErrorResponse) => {
        event.confirm.reject();
        this.isAlertTriggered = true;                             
        this.alert = this.error.errorHandler(err.status, "UPDATE ROLE : " + err.statusText);
      });
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

}
