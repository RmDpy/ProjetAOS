import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IMagasin } from '../modules/magasins/model';
import MagasinService from '../modules/magasins/service';
import e = require('express');

export class MagasinController {

    private magasin_service: MagasinService = new MagasinService();

    public create_magasin(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.magasin && req.body.libelle && req.body.site && req.body.pays && req.body.responsable && req.body.stock_val) {
            const magasin_params: IMagasin = {
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
            this.magasin_service.createMagasin(magasin_params, (err: any, magasin_data: IMagasin) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create magasin is successfull', magasin_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_magasin_by_id(req: Request, res: Response) {
        if (req.params.id) {
            const magasin_filter = { _id: req.params.id };
            this.magasin_service.filterMagasin(magasin_filter, (err: any, magasin_data: IMagasin) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter magasin is successfull', magasin_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_all_magasin(req: Request, res: Response) {
    	this.magasin_service.retrieveMagasin((err: any, magasin_data: IMagasin) => {
	    	if (err) {
	    		mongoError(err, res);
	    	} else {
	   			successResponse('Retrieve magasin is successfull', magasin_data, res);
	    	}
        });
    }

    public update_magasin(req: Request, res: Response) {
        if (req.params.id && req.body.magasin || req.body.libelle || req.body.site || req.body.pays || req.body.responsable || req.body.stock_val ) {
            const magasin_filter = { _id: req.params.id };
            this.magasin_service.filterMagasin(magasin_filter, (err: any, magasin_data: IMagasin) => {
                if (err) {
                    mongoError(err, res);
                } else if (magasin_data) {
                    magasin_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'magasin data updated'
                    });
                    const magasin_params: IMagasin = {
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
                    this.magasin_service.updateMagasin(magasin_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update magasin is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid magasin', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_magasin(req: Request, res: Response) {
        if (req.params.id) {
            this.magasin_service.deleteMagasin(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete magasin successfull', null, res);
                } else {
                    failureResponse('invalid magasin', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}