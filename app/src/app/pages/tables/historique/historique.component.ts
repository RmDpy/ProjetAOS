import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HistoriqueData } from '../../../@core/data/aos_data/historique';

@Component({
  selector: 'ngx-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
})
export class HistoriqueComponent {

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
      date: {
        title: 'Date',
        type: 'date',
      },
      reference: {
        title: 'Référence',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      mouvement: {
        title: 'Mouvement',
        type: 'string',
      },
      quantite: {
        title: 'Qté',
        type: 'number',
      },
      magasin: {
        title: 'Magasin',
        type: 'string',
      },
      emplacement: {
        title: 'Emplacement',
        type: 'string',
      },
      num_bon: {
        title: 'Bon n°',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: HistoriqueData) {
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
