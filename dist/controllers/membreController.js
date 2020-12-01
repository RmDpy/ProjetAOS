"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembreController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/membres/service");
class MembreController {
    constructor() {
        this.membre_service = new service_2.default();
    }
    create_membre(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.utilisateur && req.body.prenom && req.body.nom && req.body.email && req.body.role && req.body.organisation && req.body.date_fin && req.body.etat) {
            const membre_params = {
                utilisateur: req.body.utilisateur,
                prenom: req.body.prenom,
                nom: req.body.nom,
                email: req.body.email,
                role: req.body.role,
                organisation: req.body.organisation,
                date_fin: req.body.date_fin,
                etat: req.body.etat,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New membre created'
                    }]
            };
            this.membre_service.createMembre(membre_params, (err, membre_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create membre is successfull', membre_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_membre_by_id(req, res) {
        if (req.params.id) {
            const membre_filter = { _id: req.params.id };
            this.membre_service.filterMembre(membre_filter, (err, membre_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter membre is successfull', membre_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_membre(req, res) {
        const membre_filter = req.params;
        this.membre_service.retrieveMembre(membre_filter, (err, membre_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('Retrieve membre is successfull', membre_data, res);
            }
        });
    }
    update_membre(req, res) {
        if (req.params.id && req.body.utilisateur || req.body.prenom || req.body.nom || req.body.email || req.body.role || req.body.organisation || req.body.date_fin || req.body.etat) {
            const membre_filter = { _id: req.params.id };
            this.membre_service.filterMembre(membre_filter, (err, membre_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (membre_data) {
                    membre_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'membre data updated'
                    });
                    const membre_params = {
                        _id: req.params.id,
                        utilisateur: req.body.utilisateur ? req.body.utilisateur : membre_data.utilisateur,
                        prenom: req.body.prenom ? req.body.prenom : membre_data.prenom,
                        nom: req.body.nom ? req.body.nom : membre_data.nom,
                        email: req.body.email ? req.body.email : membre_data.email,
                        role: req.body.role ? req.body.role : membre_data.role,
                        organisation: req.body.organisation ? req.body.organisation : membre_data.organisation,
                        date_fin: req.body.date_fin ? req.body.date_fin : membre_data.date_fin,
                        etat: req.body.etat ? req.body.etat : membre_data.etat,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : membre_data.is_deleted,
                        modification_notes: membre_data.modification_notes
                    };
                    this.membre_service.updateMembre(membre_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update membre is successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid membre', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_membre(req, res) {
        if (req.params.id) {
            this.membre_service.deleteMembre(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete membre successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid membre', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.MembreController = MembreController;
