"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class HistoriqueService {
    createHistorique(historique_params, callback) {
        const _session = new schema_1.default(historique_params);
        _session.save(callback);
    }
    filterHistorique(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    retrieveHistorique(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateHistorique(historique_params, callback) {
        const query = { _id: historique_params._id };
        schema_1.default.findOneAndUpdate(query, historique_params, callback);
    }
    updateVariousHistorique(historique_params, callback) {
        const query = { magasin: historique_params.magasin };
        schema_1.default.updateMany(query, historique_params, callback);
    }
    deleteHistorique(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = HistoriqueService;
