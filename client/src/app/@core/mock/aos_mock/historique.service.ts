import { Injectable } from '@angular/core';
import { HistoriqueData } from '../../data/aos_data/historique';

@Injectable()
export class HistoriqueService extends HistoriqueData {

  data = [{
    date: '27/10/2020',
    reference: 'OBJ-A1',
    libelle: 'Objet Générique',
    mouvement: 'Entrée',
    quantite: '2',
    magasin: 'CERGY_ENTREPOT',
    emplacement: 'B2A',
    num_bon: 'A05679',
  },{
    date: '27/10/2020',
    reference: 'OBJ-A1',
    libelle: 'Objet Générique',
    mouvement: 'Sortie',
    quantite: '2',
    magasin: 'NICE_ENTREPOT',
    emplacement: 'A1C',
    num_bon: 'A05679',
  },{
    date: '26/10/2020',
    reference: 'OBJ-A2',
    libelle: 'Objet Template',
    mouvement: 'Entrée',
    quantite: '12',
    magasin: 'NICE_ENTREPOT',
    emplacement: 'Z3C',
    num_bon: 'A02468',
  },{
    date: '26/10/2020',
    reference: 'OBJ-A2',
    libelle: 'Objet Template',
    mouvement: 'Sortie',
    quantite: '12',
    magasin: 'EVRY_ENTREPOT',
    emplacement: 'G6E',
    num_bon: 'A02468',
  }];

  getData() {
    return this.data;
  }
}
