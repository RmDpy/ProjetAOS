import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';
import { UserData } from './data/users';
import { ElectricityData } from './data/electricity';
import { SmartTableData } from './data/smart-table';
//CORE MODULES AOS DATA DEB ----------------------------------------------------------------------------------------
import { ArticleData } from './data/aos_data/article';
import { MagasinData } from './data/aos_data/magasin';
import { FournisseurData } from './data/aos_data/fournisseur';
import { HistoriqueData } from './data/aos_data/historique';
import { MembreData } from './data/aos_data/membre';
import { RoleData } from './data/aos_data/role';
import { StockData } from './data/aos_data/stock';
import { TransfertData } from './data/aos_data/transfert';
//CORE MODULES AOS DATA FIN ----------------------------------------------------------------------------------------
import { UserActivityData } from './data/user-activity';
import { OrdersChartData } from './data/orders-chart';
import { ProfitChartData } from './data/profit-chart';
import { TrafficListData } from './data/traffic-list';
import { EarningData } from './data/earning';
import { OrdersProfitChartData } from './data/orders-profit-chart';
import { TrafficBarData } from './data/traffic-bar';
import { ProfitBarAnimationChartData } from './data/profit-bar-animation-chart';
import { TemperatureHumidityData } from './data/temperature-humidity';
import { SolarData } from './data/solar';
import { TrafficChartData } from './data/traffic-chart';
import { StatsBarData } from './data/stats-bar';
import { CountryOrderData } from './data/country-order';
import { StatsProgressBarData } from './data/stats-progress-bar';
import { VisitorsAnalyticsData } from './data/visitors-analytics';
import { SecurityCamerasData } from './data/security-cameras';

import { UserService } from './mock/users.service';
import { ElectricityService } from './mock/electricity.service';
import { SmartTableService } from './mock/smart-table.service';
//CORE MODULES AOS SERVICE DEB ----------------------------------------------------------------------------------------
import { ArticleService } from './mock/aos_mock/article.service';
import { MagasinService } from './mock/aos_mock/magasin.service';
import { FournisseurService } from './mock/aos_mock/fournisseur.service';
import { HistoriqueService } from './mock/aos_mock/historique.service';
import { MembreService } from './mock/aos_mock/membre.service';
import { RoleService } from './mock/aos_mock/role.service';
import { StockService } from './mock/aos_mock/stock.service';
import { TransfertService } from './mock/aos_mock/transfert.service';
//CORE MODULES AOS SERVICE FIN ----------------------------------------------------------------------------------------
import { UserActivityService } from './mock/user-activity.service';
import { OrdersChartService } from './mock/orders-chart.service';
import { ProfitChartService } from './mock/profit-chart.service';
import { TrafficListService } from './mock/traffic-list.service';
import { EarningService } from './mock/earning.service';
import { OrdersProfitChartService } from './mock/orders-profit-chart.service';
import { TrafficBarService } from './mock/traffic-bar.service';
import { ProfitBarAnimationChartService } from './mock/profit-bar-animation-chart.service';
import { TemperatureHumidityService } from './mock/temperature-humidity.service';
import { SolarService } from './mock/solar.service';
import { TrafficChartService } from './mock/traffic-chart.service';
import { StatsBarService } from './mock/stats-bar.service';
import { CountryOrderService } from './mock/country-order.service';
import { StatsProgressBarService } from './mock/stats-progress-bar.service';
import { VisitorsAnalyticsService } from './mock/visitors-analytics.service';
import { SecurityCamerasService } from './mock/security-cameras.service';
import { MockDataModule } from './mock/mock-data.module';

<<<<<<< HEAD
//CORE MODULES AOS SERVICE ACTUALLY USED DEB ----------------------------------------------------------------------------------------
import { AosArticleService } from './data/aos_data_services/aos-article.service';
import { AosMagasinService } from './data/aos_data_services/aos-magasin.service';
import { AosFournisseurService } from './data/aos_data_services/aos-fournisseur.service';
import { AosHistoriqueService } from './data/aos_data_services/aos-historique.service';
import { AosMembreService } from './data/aos_data_services/aos-membre.service';
import { AosRoleService } from './data/aos_data_services/aos-role.service';
import { AosStockService } from './data/aos_data_services/aos-stock.service';
import { AosTransfertService } from './data/aos_data_services/aos-transfert.service';
//CORE MODULES AOS SERVICE ACTUALLY USED FIN ----------------------------------------------------------------------------------------

=======
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: ElectricityData, useClass: ElectricityService },
  { provide: SmartTableData, useClass: SmartTableService },
  // aos_data DEB -------------------------------------------------------------------------------------------------------------
  { provide: MagasinData, useClass: MagasinService },
  { provide: ArticleData, useClass: ArticleService },
  { provide: FournisseurData, useClass: FournisseurService },
  { provide: HistoriqueData, useClass: HistoriqueService },
  { provide: MembreData, useClass: MembreService },
  { provide: RoleData, useClass: RoleService },
  { provide: StockData, useClass: StockService },
  { provide: TransfertData, useClass: TransfertService },
  // aos_data FIN -------------------------------------------------------------------------------------------------------------
  { provide: UserActivityData, useClass: UserActivityService },
  { provide: OrdersChartData, useClass: OrdersChartService },
  { provide: ProfitChartData, useClass: ProfitChartService },
  { provide: TrafficListData, useClass: TrafficListService },
  { provide: EarningData, useClass: EarningService },
  { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
  { provide: TrafficBarData, useClass: TrafficBarService },
  { provide: ProfitBarAnimationChartData, useClass: ProfitBarAnimationChartService },
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
  { provide: SolarData, useClass: SolarService },
  { provide: TrafficChartData, useClass: TrafficChartService },
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: CountryOrderData, useClass: CountryOrderService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
  { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
  { provide: SecurityCamerasData, useClass: SecurityCamerasService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
