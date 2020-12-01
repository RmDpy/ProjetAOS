"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfertRoutes = void 0;
const transfertController_1 = require("../controllers/transfertController");
class TransfertRoutes {
    constructor() {
        this.transfert_controller = new transfertController_1.TransfertController();
    }
    route(app) {
        app.post('/api/transfert', (req, res) => {
            this.transfert_controller.create_transfert(req, res);
        });
        app.get('/api/transfert', (req, res) => {
            this.transfert_controller.get_all_transfert(req, res);
        });
        app.get('/api/transfert/:id', (req, res) => {
            this.transfert_controller.get_transfert_by_id(req, res);
        });
        app.put('/api/transfert/:id', (req, res) => {
            this.transfert_controller.update_transfert(req, res);
        });
        app.delete('/api/transfert/:id', (req, res) => {
            this.transfert_controller.delete_transfert(req, res);
        });
    }
}
exports.TransfertRoutes = TransfertRoutes;
