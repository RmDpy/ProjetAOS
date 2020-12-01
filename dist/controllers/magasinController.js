"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagasinController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/magasins/service");
class MagasinController {
    constructor() {
        this.magasin_service = new service_2.default();
    }
    create_magasin(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.magasin && req.body.libelle && req.body.site && req.body.pays && req.body.responsable && req.body.stock_val) {
            const magasin_params = {
                magasin: req.body.magasin,
                libelle: req.body.libelle,
                site: req.body.site,
                pays: req.body.pays,
                responsable: req.body.responsable,
                stock_val: req.body.stock_val,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New magasin created'
                    }]
            };
            this.magasin_service.createMagasin(magasin_params, (err, magasin_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create magasin is successfull', magasin_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_magasin_by_id(req, res) {
        if (req.params.id) {
            const magasin_filter = { _id: req.params.id };
            this.magasin_service.filterMagasin(magasin_filter, (err, magasin_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter magasin is successfull', magasin_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_magasin(req, res) {
        const magasin_filter = req.params;
        this.magasin_service.retrieveMagasin(magasin_filter, (err, magasin_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('Retrieve magasin is successfull', magasin_data, res);
            }
        });
    }
    update_magasin(req, res) {
        if (req.params.id && req.body.magasin || req.body.libelle || req.body.site || req.body.pays || req.body.responsable || req.body.stock_val) {
            const magasin_filter = { _id: req.params.id };
            this.magasin_service.filterMagasin(magasin_filter, (err, magasin_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (magasin_data) {
                    magasin_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'magasin data updated'
                    });
                    const magasin_params = {
                        _id: req.params.id,
                        magasin: req.body.magasin ? req.body.magasin : magasin_data.magasin,
                        libelle: req.body.libelle ? req.body.libelle : magasin_data.libelle,
                        site: req.body.site ? req.body.site : magasin_data.site,
                        pays: req.body.pays ? req.body.pays : magasin_data.pays,
                        responsable: req.body.responsable ? req.body.responsable : magasin_data.responsable,
                        stock_val: req.body.stock_val ? req.body.stock_val : magasin_data.stock_val,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : magasin_data.is_deleted,
                        modification_notes: magasin_data.modification_notes
                    };
                    this.magasin_service.updateMagasin(magasin_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update magasin is successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid magasin', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_magasin(req, res) {
        if (req.params.id) {
            this.magasin_service.deleteMagasin(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete magasin successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid magasin', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.MagasinController = MagasinController;
