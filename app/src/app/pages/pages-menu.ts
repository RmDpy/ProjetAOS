import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tableau de bord',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'GESTION DE STOCK',
    group: true,
  },
  {
    title: 'Magasins',
    icon: 'grid-outline',
    link: '/pages/tables/magasin',
  },
  {
    title: 'Transferts de stock',
    icon: 'shuffle-outline',
    link: '/pages/tables/transfert',
  },
  {
    title: 'Historique du stock',
    icon: 'clock-outline',
    link: '/pages/tables/historique',
  },
  {
    title: 'EQUIPEMENT',
    group: true,
  },
  {
    title: 'Articles',
    icon: 'cube-outline',
    link: '/pages/tables/article',
  },
  {
    title: 'Fournisseurs',
    icon: 'car-outline',
    link: '/pages/tables/fournisseur',
  },
   {
    title: 'GESTION DES COMPTES',
    group: true,
  },
   {
    title: 'Mon profil',
    icon: 'person-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Rôles',
    icon: 'checkmark-square-2-outline',
    link: '/pages/tables/role',
  },
  {
    title: 'Membres',
    icon: 'people-outline',
<<<<<<< HEAD
    link: '/pages/tables/membre',
=======
    link: '/pages/tables/utilisateur',
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a
  },
];
