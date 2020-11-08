import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales
import { MagasinData } from '../../../@core/data/aos_data/magasin'; //Source des données - actuellement entrées en dur, va checker ce fichier

@Component({
  selector: 'ngx-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss'],
})
export class MagasinComponent {

  settings = {
    actions: {
      custom: [{name: 'stock', title: '<i class="nb-tables"></i>'}],
    },
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
      magasin: {
        title: 'Magasin',
        type: 'string',
      },
      libelle: {
        title: 'Libellé',
        type: 'string',
      },
      site: {
        title: 'Site',
        type: 'string',
      },
      pays: {
        title: 'Pays',
        type: 'string',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
      },
      stock_val: {
        title: 'Valeur du stock',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource(); //Declare une nouvelle source de données locales
 
  constructor(private service: MagasinData) { //Param le service depuis lequel on va charger nos données
    const data = this.service.getData(); //Call la méthode du service supposée gérer le http.get du bordel
    this.source.load(data); //Utilise le bullshit fourni par la template pour charger le résultat dans notre table
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer ?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCustomStock(event): void {
    var id = event.data.id; 
    window.location.href = "/pages/tables/stock";
    //this.router.navigate("/pages/tables/stock");
  }

}