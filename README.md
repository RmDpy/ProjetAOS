# AOS - GMAO

Gestion de stock simpliste avec historique des mouvements et gestion d'utilisateurs (authentification, inscription, rôles...). Le projet comprend une API en Node et une APP en Angular. L'intégration de l'API dans l'application n'est pas encore terminée.

## Installation

API : Executer ``npm install`` puis ``nodemon server.ts`` = localhost:8080
APP : Executer ``npm install`` puis ``npm start`` = localhost:4200 (Mozilla recommandé)
DATABASE : Créer une nouvelle DB sur MongoDB nommée 'db_gmao_local' et y importer les collections de api/db_data

Note - l'APP passe par 'proxy.conf.json' = les routes de l'API sont dispos depuis l'APP. Exemple : localhost:4200/api/magasin est une route viable pour HTTP  

## Développé avec

Le coeur du projet étant son API, le starter-kit de Nebular a été utilisé comme point de départ du front

* [ngx-admin](https://github.com/akveo/ngx-admin) - Template Angular (front-end)
* [Doc Angular](https://angular.io/tutorial/toh-pt6) - Pour lier API/APP

## Existant - APP

Module d'auth : app/node_modules/nebular/auth - avec front et diverses stratégies
[Doc Nebular Auth](https://akveo.github.io/nebular/docs/auth/configuring-a-strategy#strategy) - Documentation Nebular sur les stratégies et l'auth
Modules GMAO : app/src/app/pages/tables - Nous n'utilisons que des components à base de tables, le reste sera peut être utile pour le futur tableau de bord

## Existant - API

Modules GMAO : api/src/modules - Les routes et controllers sont dans les repertoires du même nom, et permettent un CRUD basique
Database : api/data - MongoDB locale avec les collections correspondantes aux modules et quelques données (identiques aux Dummy Datas du front)

## TODO - Par priorité

1) Intégrer Backend = Remplacer le chargement des Dummy Datas de l'APP par des traitements sur la DB
	* Se référer au component Magasin de l'app, commenté pour décrire d'ou sorte les Dummy Datas et ou concentrer le travail

2) Modifier l'API pour prendre en charge le module auth fourni par Nebular - Optionnel, recommandé
	* Possible de faire notre propre module auth et de reprendre leur front seulement, mais puisque c'est fourni, c'est surement plus propre...

3) Gestion des permissions selon le rôle accordé à l'utilisateur (parmi la liste de rôles disponibles)

4) Ajouter une page "Mon Compte" pour permettre à l'utilisateur de voir son profile et le modifier

5) Affiner la logique des modules, rajouter quelques fonctions (Transferts, Historique, Magasin, Stock)

6) Ajouter AJAX - Dans une table, des suggestions d'affichent conformément à notre input et à la DB

7) Modifier l'API pour prendre en charge les indicateurs factices du Tableau de Bord - Optionnel

8) Gros nettoyage de l'APP pour débloater le projet de toutes les dépendencies et fichiers non utilisés de la template Nebular







