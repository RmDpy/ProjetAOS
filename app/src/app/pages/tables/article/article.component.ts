import { Component, OnInit } from '@angular/core';
import { IArticleTab } from 'app/@core/data/aos_data_models/article.model';
import { AosArticleService } from 'app/@core/data/aos_data_services/aos-article.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales

@Component({
  selector: 'ngx-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

settings = {
   add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
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
    } else {
      event.confirm.reject();
    }
  }

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