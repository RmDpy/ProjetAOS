<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { IHistoriqueTab } from 'app/@core/data/aos_data_models/historique.model';
import { AosHistoriqueService } from 'app/@core/data/aos_data_services/aos-historique.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales
=======
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HistoriqueData } from '../../../@core/data/aos_data/historique';
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a

@Component({
  selector: 'ngx-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss'],
})
<<<<<<< HEAD
export class HistoriqueComponent implements OnInit {
=======
export class HistoriqueComponent {
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
<<<<<<< HEAD
  sourceRes$: IHistoriqueTab;

  constructor(private service: AosHistoriqueService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe((res: IHistoriqueTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: IHistoriqueTab) => {
          console.log(res.STATUS);
          if(res.STATUS === 'SUCCESS'){
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
          }
        });
=======

  constructor(private service: HistoriqueData) {
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
      .subscribe((res: IHistoriqueTab) => {
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
      .subscribe((res: IHistoriqueTab) => {
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
