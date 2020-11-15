<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { IStockTab } from 'app/@core/data/aos_data_models/stock.model';
import { AosStockService } from 'app/@core/data/aos_data_services/aos-stock.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales

@Component({
  selector: 'ngx-Stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
=======
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StockData } from '../../../@core/data/aos_data/stock';

@Component({
  selector: 'ngx-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
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
<<<<<<< HEAD
  sourceRes$: IStockTab;

  constructor(private service: AosStockService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe((res: IStockTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: IStockTab) => {
          console.log(res.STATUS);
          if(res.STATUS === 'SUCCESS'){
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
          }
        });
=======

  constructor(private service: StockData) {
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
      .subscribe((res: IStockTab) => {
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
      .subscribe((res: IStockTab) => {
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
