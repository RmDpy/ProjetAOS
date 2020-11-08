import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ITransfert } from '../modules/transferts/model';
import TransfertService from '../modules/transferts/service';
import e = require('express');

export class TransfertController {

    private transfert_service: TransfertService = new TransfertService();

    public create_transfert(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.reference && req.body.libelle && req.body.quantite && req.body.mag_fournisseur && req.body.mag_demandeur && req.body.emplacement && req.body.auteur && req.body.num_bon) {
            const transfert_params: ITransfert = {
                reference: req.body.reference,
                libelle: req.body.libelle,
                quantite: req.body.quantite,
                mag_fournisseur: req.body.mag_fournisseur,
                mag_demandeur: req.body.mag_demandeur,
                emplacement: req.body.emplacement,
                auteur: req.body.auteur,
                num_bon: req.body.num_bon,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New transfert created'
                }]
            };
            this.transfert_service.createTransfert(transfert_params, (err: any, transfert_data: ITransfert) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create transfert is successfull', transfert_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_transfert_by_id(req: Request, res: Response) {
        if (req.params.id) {
            const transfert_filter = { _id: req.params.id };
            this.transfert_service.filterTransfert(transfert_filter, (err: any, transfert_data: ITransfert) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter transfert is successfull', transfert_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

   public get_all_transfert(req: Request, res: Response) {
        this.transfert_service.retrieveTransfert((err: any, transfert_data: ITransfert) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('Retrieve role is successfull', transfert_data, res);
            }
        });
    }


    public update_transfert(req: Request, res: Response) {
        if (req.params.id && req.body.reference || req.body.libelle || req.body.quantite || req.body.mag_mag_fournisseur || req.body.mag_demandeur || req.body.emplacement || req.body.auteur || req.body.num_bon ) {
            const transfert_filter = { _id: req.params.id };
            this.transfert_service.filterTransfert(transfert_filter, (err: any, transfert_data: ITransfert) => {
                if (err) {
                    mongoError(err, res);
                } else if (transfert_data) {
                    transfert_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'transfert data updated'
                    });
                    const transfert_params: ITransfert = {
                        _id: req.params.id,
                        reference: req.body.reference ? req.body.reference : transfert_data.reference,
                        libelle: req.body.libelle ? req.body.libelle : transfert_data.libelle,
                        quantite: req.body.quantite ? req.body.quantite : transfert_data.quantite,
                        mag_fournisseur: req.body.mag_fournisseur ? req.body.mag_fournisseur : transfert_data.mag_fournisseur,
                        mag_demandeur: req.body.mag_demandeur ? req.body.mag_demandeur : transfert_data.mag_demandeur,
                        emplacement: req.body.emplacement ? req.body.emplacement : transfert_data.emplacement,
                        auteur: req.body.auteur ? req.body.auteur : transfert_data.auteur,
                        num_bon: req.body.num_bon ? req.body.num_bon : transfert_data.num_bon,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : transfert_data.is_deleted,
                        modification_notes: transfert_data.modification_notes
                    };
                    this.transfert_service.updateTransfert(transfert_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update transfert is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid transfert', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_transfert(req: Request, res: Response) {
        if (req.params.id) {
            this.transfert_service.deleteTransfert(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete transfert successfull', null, res);
                } else {
                    failureResponse('invalid transfert', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}