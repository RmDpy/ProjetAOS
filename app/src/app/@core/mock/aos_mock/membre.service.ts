import { Injectable } from '@angular/core';
import { MembreData } from '../../data/aos_data/membre';

@Injectable()
export class MembreService extends MembreData {

  data = [{
    utilisateur: 'LeuNoeleeste',
    prenom: 'Louis',
    nom: 'Laiolo',
    email: 'louis.laiolo@hotmail.com',
    role: 'Administrateur',
    organisation: 'AOS',
    date_fin: '01/12/2020',
    etat: 'Actif',
  },{
    utilisateur: 'Spames',
    prenom: 'Rémi',
    nom: 'Dupuy',
    email: 'remi.dupuy@gmail.com',
    role: 'Administrateur',
    organisation: 'AOS',
    date_fin: '01/12/2020',
    etat: 'Actif',
  },{
    utilisateur: 'Seffer',
    prenom: 'Loic',
    nom: 'Seffer',
    email: 'loic.seffer@live.fr',
    role: 'Administrateur',
    organisation: 'AOS',
    date_fin: '01/12/2020',
    etat: 'Actif',
  },{
    utilisateur: 'Courtaud',
    prenom: 'Didier',
    nom: 'Courtaud',
    email: 'courtaud@univ-evry.fr',
    role: 'Manager',
    organisation: 'AOS',
    date_fin: '01/12/2020',
    etat: 'Actif',
  }];

  getData() {
    return this.data;
  }
}
