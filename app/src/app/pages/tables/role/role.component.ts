import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { RoleData } from '../../../@core/data/aos_data/role';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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

  constructor(private service: RoleData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer ?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
