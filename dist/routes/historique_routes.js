"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriqueRoutes = void 0;
const historiqueController_1 = require("../controllers/historiqueController");
class HistoriqueRoutes {
    constructor() {
        this.historique_controller = new historiqueController_1.HistoriqueController();
    }
    route(app) {
        app.post('/api/historique', (req, res) => {
            this.historique_controller.create_historique(req, res);
        });
        app.get('/api/historique', (req, res) => {
            this.historique_controller.get_all_historique(req, res);
        });
        app.get('/api/historique/:id', (req, res) => {
            this.historique_controller.get_historique_by_id(req, res);
        });
        app.get('/api/stock/query/:date/:reference/:magasin:/:quantite', (req, res) => {
            this.historique_controller.get_historique_by_params(req, res);
        });
        app.put('/api/historique/:id', (req, res) => {
            this.historique_controller.update_historique(req, res);
        });
        app.put('/api/historique/query/:magasin', (req, res) => {
            this.historique_controller.update_historique_by_magasin(req, res);
        });
        app.delete('/api/historique/:id', (req, res) => {
            this.historique_controller.delete_historique(req, res);
        });
    }
}
exports.HistoriqueRoutes = HistoriqueRoutes;
