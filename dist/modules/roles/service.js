"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class RoleService {
    createRole(role_params, callback) {
        const _session = new schema_1.default(role_params);
        _session.save(callback);
    }
    filterRole(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    retrieveRole(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateRole(role_params, callback) {
        const query = { _id: role_params._id };
        schema_1.default.findOneAndUpdate(query, role_params, callback);
    }
    deleteRole(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = RoleService;
