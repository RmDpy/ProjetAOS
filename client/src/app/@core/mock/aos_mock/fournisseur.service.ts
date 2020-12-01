import { Injectable } from '@angular/core';
import { FournisseurData } from '../../data/aos_data/fournisseur';

@Injectable()
export class FournisseurService extends FournisseurData {

  data = [{
    code: 'UEVE',
    nom: 'Université Evry',
    etat: 'Actif',
    pays: 'Mali',
    devise: 'Franc CFA',
    fabriquant: 'false',
    sav: 'false',
  },{
    code: '04RE5',
    nom: 'Dell',
    etat: 'Actif',
    pays: 'Texas',
    devise: 'Dollar',
    fabriquant: 'true',
    sav: 'true',
  },{
    code: '2396',
    nom: 'Valve Corporation',
    etat: 'Actif',
    pays: 'Washington',
    devise: 'Dollar',
    fabriquant: 'true',
    sav: 'false',
  }];

  getData() {
    return this.data;
  }
}
