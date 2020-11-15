# AOS - GMAO

Gestion de stock simpliste avec historique des mouvements et gestion d'utilisateurs (authentification, inscription, rôles...). 
Le projet comprend une API en Node et une APP en Angular. L'intégration de l'API dans l'APP n'est pas encore terminée.

## Installation

**API :** Executer ``npm install`` puis ``nodemon server.ts``
	* Résultat sur localhost:8080 (Tout navigateur)

**APP :** Executer ``npm install`` puis ``npm start``
	* Résultat sur localhost:4200 (Mozilla recommandé)

**DB :** Créer une nouvelle DB 'db_gmao_local' sur MongoDB et y importer le contenu de api/db_data

Note - l'APP a accés aux routes de l'API grâce à son **proxy.conf.json**

Exemple : localhost:4200/api/magasin est une route viable pour HTTP dans le code de l'APP  

## Développé avec

Le coeur du projet étant son API, le starter-kit de Nebular a été utilisé comme point de départ du front

* [ngx-admin](https://github.com/akveo/ngx-admin) - Template Angular (front-end)
* [Doc Angular](https://angular.io/tutorial/toh-pt6) - Pour lier API/APP

## Existant - APP

**Module d'auth :** voir app/node_modules/nebular/auth - avec front et diverses stratégies

**[Doc Nebular Auth](https://akveo.github.io/nebular/docs/auth/configuring-a-strategy#strategy) :** Documentation Nebular sur les stratégies et l'auth

**Modules GMAO :** voir app/src/app/pages/tables - Nous n'utilisons que des components à base de tables

## Existant - API

**Modules GMAO :** voir api/src/modules - Les routes et controllers permettent un CRUD basique

**DB :** voir api/data - Les collections des modules et quelques données (identiques aux Dummy Datas du front)

## TODO - Par priorité

<<<<<<< HEAD
1) Modifier l'API pour prendre en charge le module auth fourni par Nebular - Optionnel, recommandé
	* Possible de faire notre propre module auth, mais puisque c'est fourni, c'est plus propre...

2) Gestion des permissions selon le rôle accordé à l'utilisateur (parmi la liste de rôles disponibles)

3) Ajouter une page "Mon Compte" pour permettre à l'utilisateur de voir son profile et le modifier

4) Affiner la logique de certains modules (surtout Transferts, Historique, Magasin, Stock)

5) Ajouter AJAX - Dans une table, des suggestions d'affichent conformément à notre input et à la DB

6) Modifier l'API pour prendre en charge les indicateurs factices du Tableau de Bord - Optionnel

7) Gros nettoyage de l'APP pour débloater le projet de toutes les dépendencies et fichiers non utilisés de Nebular
=======
1) Intégrer Backend = Remplacer le chargement des Dummy Datas de l'APP par des traitements sur la DB
	* Voir le component Magasin de l'APP, commenté pour décrire d'ou sorte les Dummy Datas

2) Modifier l'API pour prendre en charge le module auth fourni par Nebular - Optionnel, recommandé
	* Possible de faire notre propre module auth, mais puisque c'est fourni, c'est plus propre...

3) Gestion des permissions selon le rôle accordé à l'utilisateur (parmi la liste de rôles disponibles)

4) Ajouter une page "Mon Compte" pour permettre à l'utilisateur de voir son profile et le modifier

5) Affiner la logique de certains modules (surtout Transferts, Historique, Magasin, Stock)

6) Ajouter AJAX - Dans une table, des suggestions d'affichent conformément à notre input et à la DB

7) Modifier l'API pour prendre en charge les indicateurs factices du Tableau de Bord - Optionnel

8) Gros nettoyage de l'APP pour débloater le projet de toutes les dépendencies et fichiers non utilisés de Nebular
>>>>>>> fd15066c874cb0c6edfa303a893fc657ee47f75a







