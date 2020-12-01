"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class FournisseurService {
    createFournisseur(fournisseur_params, callback) {
        const _session = new schema_1.default(fournisseur_params);
        _session.save(callback);
    }
    filterFournisseur(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    retrieveFournisseur(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateFournisseur(fournisseur_params, callback) {
        const query = { _id: fournisseur_params._id };
        schema_1.default.findOneAndUpdate(query, fournisseur_params, callback);
    }
    deleteFournisseur(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = FournisseurService;
