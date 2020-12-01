"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class MagasinService {
    createMagasin(magasin_params, callback) {
        const _session = new schema_1.default(magasin_params);
        _session.save(callback);
    }
    filterMagasin(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    retrieveMagasin(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateMagasin(magasin_params, callback) {
        const query = { _id: magasin_params._id };
        schema_1.default.findOneAndUpdate(query, magasin_params, callback);
    }
    deleteMagasin(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = MagasinService;
