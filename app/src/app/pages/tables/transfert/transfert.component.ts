<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ITransfertTab } from 'app/@core/data/aos_data_models/transfert.model';
import { AosTransfertService } from 'app/@core/data/aos_data_services/aos-transfert.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales
=======
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { TransfertData } from '../../../@core/data/aos_data/transfert';
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a

@Component({
  selector: 'ngx-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss'],
})
<<<<<<< HEAD
export class TransfertComponent implements OnInit {
=======
export class TransfertComponent {
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
      reference: {
        title: 'Référence',
        type: 'number',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      quantite: {
        title: 'Quantité',
        type: 'number',
      },
      mag_fournisseur: {
        title: 'Magasin Fournisseur',
        type: 'string',
      },
      mag_demandeur: {
        title: 'Magasin Demandeur',
        type: 'string',
      },
      emplacement: {
        title: 'Emplacement',
        type: 'string',
      },
      auteur: {
        title: 'Auteur',
        type: 'string',
      },
      num_bon: {
        title: 'N°Bon',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
<<<<<<< HEAD
  sourceRes$: ITransfertTab;

  constructor(private service: AosTransfertService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe((res: ITransfertTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: ITransfertTab) => {
          console.log(res.STATUS);
          if(res.STATUS === 'SUCCESS'){
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
          }
        });
=======

  constructor(private service: TransfertData) {
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
      .subscribe((res: ITransfertTab) => {
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
      .subscribe((res: ITransfertTab) => {
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