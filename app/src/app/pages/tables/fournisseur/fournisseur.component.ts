import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { FournisseurData } from '../../../@core/data/aos_data/fournisseur';

@Component({
  selector: 'ngx-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent {

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
      code: {
        title: 'Cage Code',
        type: 'string',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      etat: {
        title: 'État',
        type: 'string',
      },
      pays: {
        title: 'Pays',
        type: 'string',
      },
      devise: {
        title: 'Devise',
        type: 'string',
      },
      fabriquant: {
        title: 'Fabricant',
        type: 'boolean',
      },
      sav: {
        title: 'SAV',
        type: 'boolean',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: FournisseurData) {
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
