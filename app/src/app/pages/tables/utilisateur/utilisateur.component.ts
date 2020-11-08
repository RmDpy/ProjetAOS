import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { MembreData } from '../../../@core/data/aos_data/membre';

@Component({
  selector: 'ngx-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
})
export class UtilisateurComponent {

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
      },
      date_fin: {
        title: 'Fin de validité',
        type: 'date',
      },
      etat: {
        title: 'Etat',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: MembreData) {
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
