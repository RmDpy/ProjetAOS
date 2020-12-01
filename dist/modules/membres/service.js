"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class MembreService {
    createMembre(membre_params, callback) {
        const _session = new schema_1.default(membre_params);
        _session.save(callback);
    }
    filterMembre(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    retrieveMembre(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateMembre(membre_params, callback) {
        const query = { _id: membre_params._id };
        schema_1.default.findOneAndUpdate(query, membre_params, callback);
    }
    deleteMembre(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = MembreService;
