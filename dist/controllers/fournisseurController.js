"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FournisseurController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/fournisseurs/service");
class FournisseurController {
    constructor() {
        this.fournisseur_service = new service_2.default();
    }
    create_fournisseur(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.code && req.body.nom && req.body.pays && req.body.devise && req.body.fabriquant && req.body.sav) {
            const fournisseur_params = {
                code: req.body.code,
                nom: req.body.nom,
                pays: req.body.pays,
                devise: req.body.devise,
                fabriquant: req.body.fabriquant,
                sav: req.body.sav,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New fournisseur created'
                    }]
            };
            this.fournisseur_service.createFournisseur(fournisseur_params, (err, fournisseur_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create fournisseur is successfull', fournisseur_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_fournisseur_by_id(req, res) {
        if (req.params.id) {
            const fournisseur_filter = { _id: req.params.id };
            this.fournisseur_service.filterFournisseur(fournisseur_filter, (err, fournisseur_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter fournisseur is successfull', fournisseur_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_fournisseur_by_code(req, res) {
        if (req.params.code) {
            const fournisseur_filter = { code: req.params.code };
            this.fournisseur_service.filterFournisseur(fournisseur_filter, (err, fournisseur_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter fournisseur is successfull', fournisseur_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_fournisseur(req, res) {
        const fournisseur_filter = req.params;
        this.fournisseur_service.retrieveFournisseur(fournisseur_filter, (err, fournisseur_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('Retrieve fournisseur is successfull', fournisseur_data, res);
            }
        });
    }
    update_fournisseur(req, res) {
        if (req.params.id && req.body.code || req.body.nom || req.body.pays || req.body.devise || req.body.fabriquant || req.body.sav) {
            const fournisseur_filter = { _id: req.params.id };
            this.fournisseur_service.filterFournisseur(fournisseur_filter, (err, fournisseur_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (fournisseur_data) {
                    fournisseur_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'fournisseur data updated'
                    });
                    const fournisseur_params = {
                        _id: req.params.id,
                        code: req.body.code ? req.body.code : fournisseur_data.code,
                        nom: req.body.nom ? req.body.nom : fournisseur_data.nom,
                        pays: req.body.pays ? req.body.pays : fournisseur_data.pays,
                        devise: req.body.devise ? req.body.devise : fournisseur_data.devise,
                        fabriquant: req.body.fabriquant ? req.body.fabriquant : fournisseur_data.fabriquant,
                        sav: req.body.sav ? req.body.sav : fournisseur_data.sav,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : fournisseur_data.is_deleted,
                        modification_notes: fournisseur_data.modification_notes
                    };
                    this.fournisseur_service.updateFournisseur(fournisseur_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update fournisseur is successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid fournisseur', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_fournisseur(req, res) {
        if (req.params.id) {
            this.fournisseur_service.deleteFournisseur(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete fournisseur successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid fournisseur', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.FournisseurController = FournisseurController;
