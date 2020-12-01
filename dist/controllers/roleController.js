"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/roles/service");
class RoleController {
    constructor() {
        this.role_service = new service_2.default();
    }
    create_role(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.role && req.body.libelle && req.body.domaine && req.body.droit && req.body.default && req.body.membres) {
            const role_params = {
                role: req.body.role,
                libelle: req.body.libelle,
                domaine: req.body.domaine,
                droit: req.body.droit,
                default: req.body.default,
                membres: req.body.membres,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New role created'
                    }]
            };
            this.role_service.createRole(role_params, (err, role_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create role is successfull', role_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_role_by_id(req, res) {
        if (req.params.id) {
            const role_filter = { _id: req.params.id };
            this.role_service.filterRole(role_filter, (err, role_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter role is successfull', role_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_role_by_role(req, res) {
        if (req.params.role) {
            const role_filter = { role: req.params.role };
            this.role_service.filterRole(role_filter, (err, role_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter role is successfull', role_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_role(req, res) {
        const role_filter = req.params;
        this.role_service.retrieveRole(role_filter, (err, role_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('Retrieve role is successfull', role_data, res);
            }
        });
    }
    update_role(req, res) {
        if (req.params.id && req.body.role || req.body.libelle || req.body.domaine || req.body.droit || req.body.default || req.body.membres) {
            const role_filter = { _id: req.params.id };
            this.role_service.filterRole(role_filter, (err, role_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (role_data) {
                    role_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'role data updated'
                    });
                    const role_params = {
                        _id: req.params.id,
                        role: req.body.role ? req.body.role : role_data.role,
                        libelle: req.body.libelle ? req.body.libelle : role_data.libelle,
                        domaine: req.body.domaine ? req.body.domaine : role_data.domaine,
                        droit: req.body.droit ? req.body.droit : role_data.droit,
                        default: req.body.default ? req.body.default : role_data.default,
                        membres: req.body.membres ? req.body.membres : role_data.membres,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : role_data.is_deleted,
                        modification_notes: role_data.modification_notes
                    };
                    this.role_service.updateRole(role_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update role is successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid role', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_role(req, res) {
        if (req.params.id) {
            this.role_service.deleteRole(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete role successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid role', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.RoleController = RoleController;
