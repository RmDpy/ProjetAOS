import { Component, OnInit } from '@angular/core';
import { IRoleTab } from 'app/@core/data/aos_data_models/role.model';
import { AosRoleService } from 'app/@core/data/aos_data_services/aos-role.service';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./Role.component.scss'],
})
export class RoleComponent implements OnInit {

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
      role: {
        title: 'Rôle',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      domaine: {
        title: 'Domaine',
        type: 'string',
      },
	  droit: {
        title: 'Droit',
        type: 'string',
      },
      default: {
        title: 'Défaut',
        type: 'string',
      },
      nb_membres: {
        title: 'Membres',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IRoleTab;

  constructor(private service: AosRoleService) { }
  
  ngOnInit(): void {
    this.service.getData()
    .subscribe((res: IRoleTab) => {
      this.sourceRes$ = res;
      this.source.load(this.sourceRes$.DATA);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: IRoleTab) => {
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
      .subscribe((res: IRoleTab) => {
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
      .subscribe((res: IRoleTab) => {
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