import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IStock } from '../modules/stocks/model';
import StockService from '../modules/stocks/service';
import e = require('express');

export class StockController {

    private stock_service: StockService = new StockService();

    public create_stock(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.emplacement && req.body.reference && req.body.libelle && req.body.etat && req.body.stock_qt && req.body.stock_val && req.body.prix) {
            const stock_params: IStock = {
                emplacement: req.body.emplacement,
                reference: req.body.reference,
                libelle: req.body.libelle,
                etat: req.body.etat,
                stock_qt: req.body.stock_qt,
                stock_val: req.body.stock_val,
                prix: req.body.prix,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New stock created'
                }]
            };
            this.stock_service.createStock(stock_params, (err: any, stock_data: IStock) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create stock is successfull', stock_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_stock(req: Request, res: Response) {
        if (req.params.id) {
            const stock_filter = { _id: req.params.id };
            this.stock_service.filterStock(stock_filter, (err: any, stock_data: IStock) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter stock is successfull', stock_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_stock(req: Request, res: Response) {
        if (req.params.id && req.body.emplacement || req.body.reference || req.body.libelle || req.body.etat || req.body.stock_qt || req.body.stock_val || req.body.prix ) {
            const stock_filter = { _id: req.params.id };
            this.stock_service.filterStock(stock_filter, (err: any, stock_data: IStock) => {
                if (err) {
                    mongoError(err, res);
                } else if (stock_data) {
                    stock_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'stock data updated'
                    });
                    const stock_params: IStock = {
                        _id: req.params.id,
                        emplacement: req.body.emplacement ? req.body.emplacement : stock_data.emplacement,
                        reference: req.body.reference ? req.body.reference : stock_data.reference,
                        libelle: req.body.libelle ? req.body.libelle : stock_data.libelle,
                        etat: req.body.etat ? req.body.etat : stock_data.etat,
                        stock_qt: req.body.stock_qt ? req.body.stock_qt : stock_data.stock_qt,
                        stock_val: req.body.stock_val ? req.body.stock_val : stock_data.stock_val,
                        prix: req.body.prix ? req.body.prix : stock_data.prix,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : stock_data.is_deleted,
                        modification_notes: stock_data.modification_notes
                    };
                    this.stock_service.updateStock(stock_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update stock is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid stock', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_stock(req: Request, res: Response) {
        if (req.params.id) {
            this.stock_service.deleteStock(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete stock successfull', null, res);
                } else {
                    failureResponse('invalid stock', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}