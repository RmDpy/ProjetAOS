<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { IMagasinTab } from 'app/@core/data/aos_data_models/magasin.model';
import { AosMagasinService } from 'app/@core/data/aos_data_services/aos-magasin.service';
import { LocalDataSource } from 'ng2-smart-table';
=======
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table'; //Bullshit de la template qui permet de gérer les données locales
import { MagasinData } from '../../../@core/data/aos_data/magasin'; //Source des données - actuellement entrées en dur, va checker ce fichier
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a

@Component({
  selector: 'ngx-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss'],
})
<<<<<<< HEAD
export class MagasinComponent implements OnInit {
=======
export class MagasinComponent {
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a

  settings = {
    actions: {
      custom: [{name: 'stock', title: '<i class="nb-tables"></i>'}],
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
<<<<<<< HEAD
      confirmCreate: true, //Obligatoire pour faire comprendre à la template qu'on passe par nos propres fonctions
=======
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
<<<<<<< HEAD
      confirmSave: true, //Obligatoire pour faire comprendre à la template qu'on passe par nos propres fonctions
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true, //Obligatoire pour faire comprendre à la template qu'on passe par nos propres fonctions
=======
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
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

<<<<<<< HEAD
  source: LocalDataSource = new LocalDataSource();
  sourceRes$: IMagasinTab; //Permet de définir le type attendu pour res = L'interface correspondante à notre model
  
  constructor(private service: AosMagasinService) { } //On définit le service approprié
  
  ngOnInit(): void {
    this.service.getData() //Invoque la fonction approppriée, ici Get obviously
    .subscribe((res: IMagasinTab) => {
      this.sourceRes$ = res; //Je devrai vérifier si le status de la res est ok mais j'ai zappé pour le get
      console.log(this.sourceRes$.DATA);
      this.source.load(this.sourceRes$.DATA); //load permet d'injecter la partie DATA de la res dans la table
    });
  }

  onDeleteConfirm(event): void { //Est appelé quand on delete (se referer au component.html)
    if (window.confirm('Voulez-vous vraiment supprimer ce magasin ?')) {
      this.service.deleteData(event.data._id)
        .subscribe((res: IMagasinTab) => {
          console.log(res.STATUS);
          if(res.STATUS === 'SUCCESS'){ //Check si le status est ok avant de modifier le front
            event.confirm.resolve(event.data); //Retire la ligne appropriée de la table
            this.source.remove(event.data); //Retire les données appropriées de la source de données
          }
        });
=======
  source: LocalDataSource = new LocalDataSource(); //Declare une nouvelle source de données locales

  constructor(private service: MagasinData) { //Param le service depuis lequel on va charger nos données
    const data = this.service.getData(); //Call la méthode du service supposée gérer le http.get du bordel
    
    this.source.load(data); //Utilise le bullshit fourni par la template pour charger le résultat dans notre table
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer ?')) {
      event.confirm.resolve();
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
    } else {
      event.confirm.reject();
    }
  }

  onCustomStock(event): void {
<<<<<<< HEAD
    //var id = event.data.id; 
    //window.location.href = "/pages/tables/stock";
    //this.router.navigate("/pages/tables/stock");
  }

  onCreateConfirm(event): void {
    this.service.setData(event.newData)
      .subscribe((res: IMagasinTab) => {
        console.log(res.STATUS);
        if(res.STATUS === 'SUCCESS'){
          event.confirm.resolve(event.newData);
          this.source.refresh(); //TODO : Bug, quand on vient de rajouter une ligne, il faut recharger la page avant de pouvour la delete/edit...
        } else {
          event.confirm.reject();
        }
      });
  }

  onEditConfirm(event): void {
    this.service.updateData(event.data._id, event.newData)
      .subscribe((res: IMagasinTab) => {
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
    var id = event.data.id;
    window.location.href = "/pages/tables/stock";
    //this.router.navigate("/pages/tables/stock");
  }

}
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
