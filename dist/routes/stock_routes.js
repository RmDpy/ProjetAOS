"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRoutes = void 0;
const stockController_1 = require("../controllers/stockController");
class StockRoutes {
    constructor() {
        this.stock_controller = new stockController_1.StockController();
    }
    route(app) {
        app.post('/api/stock', (req, res) => {
            this.stock_controller.create_stock(req, res);
        });
        app.get('/api/stock', (req, res) => {
            this.stock_controller.get_all_stock(req, res);
        });
        app.get('/api/stock/:id', (req, res) => {
            this.stock_controller.get_stock_by_id(req, res);
        });
        app.get('/api/stock/magasin/:magasin_id', (req, res) => {
            this.stock_controller.get_stock_by_magasin(req, res);
        });
        app.get('/api/stock/query/:reference/:magasin', (req, res) => {
            this.stock_controller.get_stock_by_params(req, res);
        });
        app.put('/api/stock/:id', (req, res) => {
            this.stock_controller.update_stock(req, res);
        });
        app.delete('/api/stock/:id', (req, res) => {
            this.stock_controller.delete_stock(req, res);
        });
        app.delete('/api/stock/query/:magasin', (req, res) => {
            this.stock_controller.delete_by_magasin(req, res);
        });
    }
}
exports.StockRoutes = StockRoutes;
