<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { IArticleTab } from 'app/@core/data/aos_data_models/article.model';
import { AosArticleService } from 'app/@core/data/aos_data_services/aos-article.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales
=======
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ArticleData } from '../../../@core/data/aos_data/article';
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a

@Component({
  selector: 'ngx-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
<<<<<<< HEAD
export class ArticleComponent implements OnInit {

settings = {
   add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
=======
export class ArticleComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      etat: {
        title: 'État',
        type: 'string',
      },
      fournisseur: {
        title: 'Fournisseur',
        type: 'string',
      },
      organisation: {
        title: 'Organisation',
        type: 'string',
      },
      prix: {
        title: 'Prix Standard',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
<<<<<<< HEAD
  sourceRes$: IArticleTab;

  constructor(private service: AosArticleService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe((res: IArticleTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: IArticleTab) => {
          console.log(res.STATUS);
          if(res.STATUS === 'SUCCESS'){
            event.confirm.resolve(event.data);
            this.source.remove(event.data);
          }
        });
=======

  constructor(private service: ArticleData) {
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
      .subscribe((res: IArticleTab) => {
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
      .subscribe((res: IArticleTab) => {
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
