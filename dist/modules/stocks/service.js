"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class StockService {
    createStock(stock_params, callback) {
        const _session = new schema_1.default(stock_params);
        _session.save(callback);
    }
    filterStock(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    filterNumStock(query, callback) {
        schema_1.default.find(query, callback);
    }
    retrieveStock(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateStock(stock_params, callback) {
        const query = { _id: stock_params._id };
        schema_1.default.findOneAndUpdate(query, stock_params, callback);
    }
    deleteStock(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
    deleteMagasinStock(magasin, callback) {
        const query = { magasin: magasin };
        schema_1.default.deleteMany(query, callback);
    }
}
exports.default = StockService;
