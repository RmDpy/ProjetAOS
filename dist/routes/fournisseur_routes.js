"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FournisseurRoutes = void 0;
const fournisseurController_1 = require("../controllers/fournisseurController");
class FournisseurRoutes {
    constructor() {
        this.fournisseur_controller = new fournisseurController_1.FournisseurController();
    }
    route(app) {
        app.post('/api/fournisseur', (req, res) => {
            this.fournisseur_controller.create_fournisseur(req, res);
        });
        app.get('/api/fournisseur', (req, res) => {
            this.fournisseur_controller.get_all_fournisseur(req, res);
        });
        app.get('/api/fournisseur/:id', (req, res) => {
            this.fournisseur_controller.get_fournisseur_by_id(req, res);
        });
        app.put('/api/fournisseur/:id', (req, res) => {
            this.fournisseur_controller.update_fournisseur(req, res);
        });
        app.delete('/api/fournisseur/:id', (req, res) => {
            this.fournisseur_controller.delete_fournisseur(req, res);
        });
    }
}
exports.FournisseurRoutes = FournisseurRoutes;
