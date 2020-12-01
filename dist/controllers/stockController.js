"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/stocks/service");
class StockController {
    constructor() {
        this.stock_service = new service_2.default();
    }
    create_stock(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.magasin && req.body.emplacement && req.body.reference && req.body.libelle && req.body.stock_qt) {
            const stock_params = {
                magasin: req.body.magasin,
                emplacement: req.body.emplacement,
                reference: req.body.reference,
                libelle: req.body.libelle,
                stock_qt: req.body.stock_qt,
                stock_val: req.body.stock_val,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New stock created'
                    }]
            };
            this.stock_service.createStock(stock_params, (err, stock_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create stock is successfull', stock_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_stock_by_id(req, res) {
        if (req.params.id) {
            const stock_filter = { _id: req.params.id };
            this.stock_service.filterStock(stock_filter, (err, stock_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter stock by id is successfull', stock_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_stock_by_params(req, res) {
        if (req.params.reference && req.params.magasin) {
            const stock_filter = { reference: req.params.reference, magasin: req.params.magasin };
            this.stock_service.filterStock(stock_filter, (err, stock_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter stock by new params is successfull', stock_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_stock_by_magasin(req, res) {
        if (req.params.magasin) {
            const stock_filter = { magasin: req.params.magasin };
            this.stock_service.filterNumStock(stock_filter, (err, stock_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter stock by mag is successfull', stock_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_stock(req, res) {
        const stock_filter = req.params;
        this.stock_service.retrieveStock(stock_filter, (err, stock_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('Retrieve stock is successfull', stock_data, res);
            }
        });
    }
    update_stock(req, res) {
        if (req.params.id && req.body.magasin || req.body.emplacement || req.body.reference || req.body.libelle || req.body.stock_qt) {
            const stock_filter = { _id: req.params.id };
            this.stock_service.filterStock(stock_filter, (err, stock_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (stock_data) {
                    stock_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'stock data updated'
                    });
                    const stock_params = {
                        _id: req.params.id,
                        magasin: req.body.magasin ? req.body.magasin : stock_data.magasin,
                        emplacement: req.body.emplacement ? req.body.emplacement : stock_data.emplacement,
                        reference: req.body.reference ? req.body.reference : stock_data.reference,
                        libelle: req.body.libelle ? req.body.libelle : stock_data.libelle,
                        stock_qt: req.body.stock_qt ? req.body.stock_qt : stock_data.stock_qt,
                        stock_val: req.body.stock_val ? req.body.stock_val : stock_data.stock_val,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : stock_data.is_deleted,
                        modification_notes: stock_data.modification_notes
                    };
                    this.stock_service.updateStock(stock_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update stock is successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid stock', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_stock(req, res) {
        if (req.params.id) {
            this.stock_service.deleteStock(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete stock successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid stock', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_by_magasin(req, res) {
        if (req.params.magasin) {
            this.stock_service.deleteMagasinStock(req.params.magasin, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete stock by magasin is successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid stock', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.StockController = StockController;
