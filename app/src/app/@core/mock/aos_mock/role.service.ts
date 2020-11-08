import { Injectable } from '@angular/core';
import { RoleData } from '../../data/aos_data/role';

@Injectable()
export class RoleService extends RoleData {

  data = [{
    role: 'ADMIN',
    libelle: 'Administrateur',
    domaine: 'Complet',
    droit: 'Complet',
    default: false,
    nb_membres: 3,
  },{
    role: 'MANAGER',
    libelle: 'Chef de projet',
    domaine: 'Equipement',
    droit: 'Complet',
    default: false,
    nb_membres: 1,
  },{
    role: 'CLIENT',
    libelle: 'Client',
    domaine: 'Gestion de stock',
    droit: 'Lecture',
    default: true,
    nb_membres: 0,
  },{
    role: 'TECH',
    libelle: 'Technicien',
    domaine: 'Gestion de stock',
    droit: 'Complet',
    default: false,
    nb_membres: 0,
  }];

  getData() {
    return this.data;
  }
}
