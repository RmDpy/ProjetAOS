import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { StockComponent } from './stock/stock.component';
import { TransfertComponent } from './transfert/transfert.component';
import { HistoriqueComponent } from './historique/historique.component';
import { MagasinComponent } from './magasin/magasin.component';
import { ArticleComponent } from './article/article.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'role',
      component: RoleComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
    {
      path: 'stock',
      component: StockComponent,
    },
    {
      path: 'transfert',
      component: TransfertComponent,
    },
    {
      path: 'historique',
      component: HistoriqueComponent,
    },
    {
      path: 'magasin',
      component: MagasinComponent,
    },
    {
      path: 'article',
      component: ArticleComponent,
    },
    {
      path: 'fournisseur',
      component: FournisseurComponent,
    },
    {
      path: 'utilisateur',
      component: UtilisateurComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
  StockComponent,
  TransfertComponent,
  HistoriqueComponent,
  MagasinComponent,
  ArticleComponent,
  FournisseurComponent,
  UtilisateurComponent,
  RoleComponent,
];
