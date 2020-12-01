"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class TransfertService {
    createTransfert(transfert_params, callback) {
        const _session = new schema_1.default(transfert_params);
        _session.save(callback);
    }
    filterTransfert(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    retrieveTransfert(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateTransfert(transfert_params, callback) {
        const query = { _id: transfert_params._id };
        schema_1.default.findOneAndUpdate(query, transfert_params, callback);
    }
    deleteTransfert(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = TransfertService;
