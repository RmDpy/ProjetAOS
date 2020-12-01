"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
//import jwt = require('jsonwebtoken');
const membreController_1 = require("../controllers/membreController");
class Auth {
    constructor() {
        this.membre_controller = new membreController_1.MembreController();
    }
    route(app) {
        app.post('/api/login', (req, res) => {
            //this.membre_controller.authenticate_membre(req, res);
        });
    }
}
exports.Auth = Auth;
