"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagasinRoutes = void 0;
const magasinController_1 = require("../controllers/magasinController");
class MagasinRoutes {
    constructor() {
        this.magasin_controller = new magasinController_1.MagasinController();
    }
    route(app) {
        app.post('/api/magasin', (req, res) => {
            this.magasin_controller.create_magasin(req, res);
        });
        app.get('/api/magasin', (req, res) => {
            this.magasin_controller.get_all_magasin(req, res);
        });
        app.get('/api/magasin/:id', (req, res) => {
            this.magasin_controller.get_magasin_by_id(req, res);
        });
        app.put('/api/magasin/:id', (req, res) => {
            this.magasin_controller.update_magasin(req, res);
        });
        app.delete('/api/magasin/:id', (req, res) => {
            this.magasin_controller.delete_magasin(req, res);
        });
    }
}
exports.MagasinRoutes = MagasinRoutes;
