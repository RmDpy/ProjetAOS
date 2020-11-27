import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IMagasinTab } from 'app/@core/data/aos_data_models/magasin.model';
import { AosErrorService } from 'app/@core/data/aos_data_services/aos-error.service';
import { AosMagasinService } from 'app/@core/data/aos_data_services/aos-magasin.service';
import { LocalDataSource } from 'ng2-smart-table';
import { __param } from 'tslib';

@Component({
  selector: 'ngx-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss'],
})
export class MagasinComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true, //Obligatoire pour faire comprendre à la template qu'on passe par nos propres fonctions
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true, //Obligatoire pour faire comprendre à la template qu'on passe par nos propres fonctions
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true, //Obligatoire pour faire comprendre à la template qu'on passe par nos propres fonctions
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
        width: '15%',
      },
      pays: {
        title: 'Pays',
        type: 'string',
        width: '10%',
      },
      responsable: {
        title: 'Responsable',
        type: 'string',
        width: '15%',
      },
      stock_val: {
        title: 'Valeur du stock',
        type: 'string',
        width: '15%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IMagasinTab; //Permet de définir le type attendu pour res = L'interface correspondante à notre model
  alert: object;
  isAlertTriggered: boolean;
  
  constructor(private service: AosMagasinService, private error: AosErrorService) { } //On définit le service approprié

  ngOnInit(): void {
    this.isAlertTriggered = false;
    this.service.getData() //Invoque la fonction approppriée, ici Get obviously
    .subscribe(
      (res: IMagasinTab) => {
      this.sourceRes$ = res; //Je devrai vérifier si le status de la res est ok mais j'ai zappé pour le get
      this.source.load(this.sourceRes$.DATA); //load permet d'injecter la partie DATA de la res dans la table
    },(err: HttpErrorResponse) => {
      this.isAlertTriggered = true;                             
      this.alert = this.error.errorHandler(err.status, err.statusText);
    });
  }

  onClosingAlert(): void {
    if(this.isAlertTriggered)
      this.isAlertTriggered = false;
  }

  onDeleteConfirm(event): void { //Est appelé quand on delete (se referer au component.html)
    if (window.confirm('Voulez-vous vraiment supprimer ce magasin ?')) {
      this.service.deleteData(event.data._id)
        .subscribe(
          (res: IMagasinTab) => {
            event.confirm.resolve(event.data); //Retire la ligne appropriée de la table
            this.source.remove(event.data); //Retire les données appropriées de la source de données
            this.onClosingAlert();
        },(err: HttpErrorResponse) => {       
            event.confirm.reject();                      
            this.isAlertTriggered = true;                             
            this.alert = this.error.errorHandler(err.status, err.statusText);
        });
    } else {
      event.confirm.reject();
    }
  }
  
  onCreateConfirm(event): void {
    this.service.setData(event.newData)
      .subscribe(
        (res: IMagasinTab) => {
          event.confirm.resolve(event.newData);
          this.source.refresh(); //TODO : Bug, quand on vient de rajouter une ligne, il faut recharger la page avant de pouvour la delete/edit...
          this.onClosingAlert();
        },(err: HttpErrorResponse) => {  
          event.confirm.reject();                           
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, err.statusText);
        });
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe(
        (res: IMagasinTab) => {
          event.confirm.resolve(event.newData);
          this.source.update(event.data, event.newData);
          this.onClosingAlert();
      },(err: HttpErrorResponse) => {
          event.confirm.reject();                             
          this.isAlertTriggered = true;                             
          this.alert = this.error.errorHandler(err.status, err.statusText);
      });
  }

}
