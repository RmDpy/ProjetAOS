import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IFournisseur } from '../modules/fournisseurs/model';
import FournisseurService from '../modules/fournisseurs/service';
import e = require('express');

export class FournisseurController {

    private fournisseur_service: FournisseurService = new FournisseurService();

    public create_fournisseur(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.code && req.body.nom && req.body.etat && req.body.pays && req.body.devise && req.body.fabriquant && req.body.sav) {
            const fournisseur_params: IFournisseur = {
                code: req.body.code,
                nom: req.body.nom,
                etat: req.body.etat,
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
            this.fournisseur_service.createFournisseur(fournisseur_params, (err: any, fournisseur_data: IFournisseur) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create fournisseur is successfull', fournisseur_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_fournisseur_by_id(req: Request, res: Response) {
        if (req.params.id) {
            const fournisseur_filter = { _id: req.params.id };
            this.fournisseur_service.filterFournisseur(fournisseur_filter, (err: any, fournisseur_data: IFournisseur) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter fournisseur is successfull', fournisseur_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_all_fournisseur(req: Request, res: Response) {
        const fournisseur_filter = req.params;
    	this.fournisseur_service.retrieveFournisseur(fournisseur_filter, (err: any, fournisseur_data: IFournisseur) => {
        	if (err) {
            	mongoError(err, res);
            } else {
                successResponse('Retrieve fournisseur is successfull', fournisseur_data, res);
                }
            });
    }

    public update_fournisseur(req: Request, res: Response) {
        if (req.params.id && req.body.code || req.body.nom || req.body.etat || req.body.pays || req.body.devise || req.body.fabriquant || req.body.sav) {
            const fournisseur_filter = { _id: req.params.id };
            this.fournisseur_service.filterFournisseur(fournisseur_filter, (err: any, fournisseur_data: IFournisseur) => {
                if (err) {
                    mongoError(err, res);
                } else if (fournisseur_data) {
                    fournisseur_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'fournisseur data updated'
                    });
                    const fournisseur_params: IFournisseur = {
                        _id: req.params.id,
                        code: req.body.code ? req.body.code : fournisseur_data.code,
                        nom: req.body.nom ? req.body.nom : fournisseur_data.nom,
                        etat: req.body.etat ? req.body.etat : fournisseur_data.etat,
                        pays: req.body.pays ? req.body.pays : fournisseur_data.pays,
                        devise: req.body.devise ? req.body.devise : fournisseur_data.devise,
                        fabriquant: req.body.fabriquant ? req.body.fabriquant : fournisseur_data.fabriquant,
                        sav: req.body.sav ? req.body.sav : fournisseur_data.sav,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : fournisseur_data.is_deleted,
                        modification_notes: fournisseur_data.modification_notes
                    };
                    this.fournisseur_service.updateFournisseur(fournisseur_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update fournisseur is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid fournisseur', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_fournisseur(req: Request, res: Response) {
        if (req.params.id) {
            this.fournisseur_service.deleteFournisseur(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete fournisseur successfull', null, res);
                } else {
                    failureResponse('invalid fournisseur', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}