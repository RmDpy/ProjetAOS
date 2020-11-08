import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StockData } from '../../../@core/data/aos_data/stock';

@Component({
  selector: 'ngx-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {

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
      emplacement: {
        title: 'Emplacement',
        type: 'string',
      },
      etat: {
        title: 'Etat',
        type: 'string',
      },
      reference: {
        title: 'Référence',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      prix: {
        title: 'Prix Unitaire',
        type: 'number',
      },
      stock_qt: {
        title: 'Quantité',
        type: 'number',
      },
      stock_val: {
        title: 'Valeur',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: StockData) {
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
