import { Injectable } from '@angular/core';
import { ArticleData } from '../../data/aos_data/article';

@Injectable()
export class ArticleService extends ArticleData {

  data = [{
    reference: 'OBJ-A1',
    libelle: 'Objet Générique',
    etat: 'Actif',
    fournisseur: 'UEVE',
    organisation: 'AOS',
    prix: '28 euros',
  }, {
    reference: 'OBJ-A2',
    libelle: 'Objet Template',
    etat: 'Actif',
    fournisseur: '04RE5',
    organisation: 'AOS',
    prix: '4 euros',
  }, {
    reference: 'OBJ-A3',
    libelle: 'Objet Générique',
    etat: 'Inactif',
    fournisseur: '2396',
    organisation: 'RECHOP',
    prix: '6 euros',
  }];

  getData() {
    return this.data;
  }
}
