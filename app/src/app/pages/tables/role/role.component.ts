<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { IRoleTab } from 'app/@core/data/aos_data_models/role.model';
import { AosRoleService } from 'app/@core/data/aos_data_services/aos-role.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales
=======
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { RoleData } from '../../../@core/data/aos_data/role';
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
<<<<<<< HEAD
  styleUrls: ['./Role.component.scss'],
})
export class RoleComponent implements OnInit {
=======
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent {
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
<<<<<<< HEAD
      confirmCreate: true,
=======
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
<<<<<<< HEAD
      confirmSave: true,
=======
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
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
      },
      default: {
        title: 'Défaut',
        type: 'string',
      },
      nb_membres: {
        title: 'Membres',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
<<<<<<< HEAD
  sourceRes$: IRoleTab;

  constructor(private service: AosRoleService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe((res: IRoleTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: IRoleTab) => {
          console.log(res.STATUS);
          if(res.STATUS === 'SUCCESS'){
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
          }
        });
=======

  constructor(private service: RoleData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer ?')) {
      event.confirm.resolve();
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
    } else {
      event.confirm.reject();
    }
  }
<<<<<<< HEAD

  onCreateConfirm(event): void {
    this.service.setData(event.newData)
      .subscribe((res: IRoleTab) => {
        console.log(res.STATUS);
        if(res.STATUS === 'SUCCESS'){
          event.confirm.resolve(event.newData);
          this.source.refresh();
        } else {
          event.confirm.reject();
        }
      });
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe((res: IRoleTab) => {
        console.log(res.STATUS);
        if(res.STATUS === 'SUCCESS'){
          event.confirm.resolve(event.newData);
          this.source.update(event.data, event.newData);
        } else {
          event.confirm.reject();
        }
      });
  }
}
=======
}
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
