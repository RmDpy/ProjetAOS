import { Injectable } from '@angular/core';
import { StockData } from '../../data/aos_data/stock';

@Injectable()
export class StockService extends StockData {

  data = [{
    emplacement: 'B1A',
    etat: 'inactif',
    reference: '-',
    libelle: '-',
    prix: '-',
    stock_qt: 0,
    stock_val: '-',
  },{
    emplacement: 'B2A',
    etat: 'actif',
    reference: 'OBJ-A1',
    libelle: 'Objet Générique',
    prix: '28 euros',
    stock_qt: 3,
    stock_val: '84 euros',
  },{
    emplacement: 'B2B',
    etat: 'actif',
    reference: 'OBJ-A2',
    libelle: 'Objet Template',
    prix: '4 euros',
    stock_qt: 3,
    stock_val: '12 euros',
  },{
    emplacement: 'B2C',
    etat: 'inactif',
    reference: '-',
    libelle: '-',
    prix: '-',
    stock_qt: 0,
    stock_val: '-',
  }];

  getData() {
    return this.data;
  }
}
