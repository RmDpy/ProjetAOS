"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const magasin_routes_1 = require("../routes/magasin_routes");
const article_routes_1 = require("../routes/article_routes");
const transfert_routes_1 = require("../routes/transfert_routes");
const historique_routes_1 = require("../routes/historique_routes");
const fournisseur_routes_1 = require("../routes/fournisseur_routes");
const role_routes_1 = require("../routes/role_routes");
const membre_routes_1 = require("../routes/membre_routes");
const stock_routes_1 = require("../routes/stock_routes");
const common_routes_1 = require("../routes/common_routes");
const path = require("path");
class App {
    constructor() {
        this.mongoUrl = 'mongodb+srv://admin_bdd:admin_bdd@cluster0.aqzty.mongodb.net/db_gmao_prod?retryWrites=true&w=majority';
        this.magasin_routes = new magasin_routes_1.MagasinRoutes();
        this.article_routes = new article_routes_1.ArticleRoutes();
        this.transfert_routes = new transfert_routes_1.TransfertRoutes();
        this.historique_routes = new historique_routes_1.HistoriqueRoutes();
        this.fournisseur_routes = new fournisseur_routes_1.FournisseurRoutes();
        this.role_routes = new role_routes_1.RoleRoutes();
        this.membre_routes = new membre_routes_1.MembreRoutes();
        this.stock_routes = new stock_routes_1.StockRoutes();
        this.common_routes = new common_routes_1.CommonRoutes();
        this.app = express();
        this.app.use(express.static(path.join(__dirname, "../../client/dist")));
        this.config();
        this.mongoSetup();
        this.magasin_routes.route(this.app);
        this.article_routes.route(this.app);
        this.transfert_routes.route(this.app);
        this.historique_routes.route(this.app);
        this.fournisseur_routes.route(this.app);
        this.membre_routes.route(this.app);
        this.role_routes.route(this.app);
        this.stock_routes.route(this.app);
        this.common_routes.route(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log('DB path ' + this.mongoUrl);
    }
}
exports.default = new App().app;
