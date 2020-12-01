"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembreRoutes = void 0;
const membreController_1 = require("../controllers/membreController");
class MembreRoutes {
    constructor() {
        this.membre_controller = new membreController_1.MembreController();
    }
    route(app) {
        app.post('/api/membre', (req, res) => {
            this.membre_controller.create_membre(req, res);
        });
        app.get('/api/membre', (req, res) => {
            this.membre_controller.get_all_membre(req, res);
        });
        app.get('/api/membre/:id', (req, res) => {
            this.membre_controller.get_membre_by_id(req, res);
        });
        app.put('/api/membre/:id', (req, res) => {
            this.membre_controller.update_membre(req, res);
        });
        app.delete('/api/membre/:id', (req, res) => {
            this.membre_controller.delete_membre(req, res);
        });
    }
}
exports.MembreRoutes = MembreRoutes;
