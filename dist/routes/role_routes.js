"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const roleController_1 = require("../controllers/roleController");
class RoleRoutes {
    constructor() {
        this.role_controller = new roleController_1.RoleController();
    }
    route(app) {
        app.post('/api/role', (req, res) => {
            this.role_controller.create_role(req, res);
        });
        app.get('/api/role', (req, res) => {
            this.role_controller.get_all_role(req, res);
        });
        app.get('/api/role/:id', (req, res) => {
            this.role_controller.get_role_by_id(req, res);
        });
        app.get('/api/role/query/:role', (req, res) => {
            this.role_controller.get_role_by_role(req, res);
        });
        app.put('/api/role/:id', (req, res) => {
            this.role_controller.update_role(req, res);
        });
        app.delete('/api/role/:id', (req, res) => {
            this.role_controller.delete_role(req, res);
        });
    }
}
exports.RoleRoutes = RoleRoutes;
