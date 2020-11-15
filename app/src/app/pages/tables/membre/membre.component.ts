import { Component, OnInit } from '@angular/core';
import { IMembreTab } from 'app/@core/data/aos_data_models/membre.model';
import { AosMembreService } from 'app/@core/data/aos_data_services/aos-membre.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales

@Component({
  selector: 'ngx-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.scss'],
})
export class MembreComponent implements OnInit {

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
  sourceRes$: IMembreTab;

  constructor(private service: AosMembreService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe((res: IMembreTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: IMembreTab) => {
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
      .subscribe((res: IMembreTab) => {
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
      .subscribe((res: IMembreTab) => {
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