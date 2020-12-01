"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfertController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/transferts/service");
class TransfertController {
    constructor() {
        this.transfert_service = new service_2.default();
    }
    //private historique_controller: HistoriqueController = new HistoriqueController();
    create_transfert(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.reference && req.body.libelle && req.body.quantite && req.body.mag_fournisseur && req.body.mag_demandeur && req.body.num_bon) {
            const transfert_params = {
                reference: req.body.reference,
                libelle: req.body.libelle,
                quantite: req.body.quantite,
                mag_fournisseur: req.body.mag_fournisseur,
                mag_demandeur: req.body.mag_demandeur,
                num_bon: req.body.num_bon,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New transfert created'
                    }]
            };
            this.transfert_service.createTransfert(transfert_params, (err, transfert_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create transfert is successfull', transfert_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_transfert_by_id(req, res) {
        if (req.params.id) {
            const transfert_filter = { _id: req.params.id };
            this.transfert_service.filterTransfert(transfert_filter, (err, transfert_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter transfert is successfull', transfert_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_transfert(req, res) {
        const transfert_filter = req.params;
        this.transfert_service.retrieveTransfert(transfert_filter, (err, transfert_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('Retrieve role is successfull', transfert_data, res);
            }
        });
    }
    update_transfert(req, res) {
        if (req.params.id && req.body.reference || req.body.libelle || req.body.quantite || req.body.mag_mag_fournisseur || req.body.mag_demandeur || req.body.num_bon) {
            const transfert_filter = { _id: req.params.id };
            this.transfert_service.filterTransfert(transfert_filter, (err, transfert_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (transfert_data) {
                    transfert_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'transfert data updated'
                    });
                    const transfert_params = {
                        _id: req.params.id,
                        reference: req.body.reference ? req.body.reference : transfert_data.reference,
                        libelle: req.body.libelle ? req.body.libelle : transfert_data.libelle,
                        quantite: req.body.quantite ? req.body.quantite : transfert_data.quantite,
                        mag_fournisseur: req.body.mag_fournisseur ? req.body.mag_fournisseur : transfert_data.mag_fournisseur,
                        mag_demandeur: req.body.mag_demandeur ? req.body.mag_demandeur : transfert_data.mag_demandeur,
                        num_bon: req.body.num_bon ? req.body.num_bon : transfert_data.num_bon,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : transfert_data.is_deleted,
                        modification_notes: transfert_data.modification_notes
                    };
                    this.transfert_service.updateTransfert(transfert_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update transfert is successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid transfert', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_transfert(req, res) {
        if (req.params.id) {
            this.transfert_service.deleteTransfert(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete transfert successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid transfert', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.TransfertController = TransfertController;
