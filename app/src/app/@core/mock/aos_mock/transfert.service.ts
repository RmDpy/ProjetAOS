import { Injectable } from '@angular/core';
import { TransfertData } from '../../data/aos_data/transfert';

@Injectable()
export class TransfertService extends TransfertData {

  data = [{
    reference: 'OBJ-A1',
    libelle: 'Objet Générique',
    quantite: 2,
    mag_fournisseur: 'NICE_ENTREPOT',
    mag_demandeur: 'CERGY_ENTREPOT',
    emplacement: 'B2A',
    auteur : 'LeuNoeleeste',
    num_bon : 'A05679',
  }, {
    reference: 'OBJ-A2',
    libelle: 'Objet Template',
    quantite: 12,
    mag_fournisseur: 'EVRY_ENTREPOT',
    mag_demandeur: 'NICE_ENTREPOT',
    emplacement: 'Z3C',
    auteur : 'Spames',
    num_bon : 'A02468',
  }];

  getData() {
    return this.data;
  }
}
