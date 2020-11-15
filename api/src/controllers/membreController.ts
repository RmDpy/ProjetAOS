import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IMembre } from '../modules/membres/model';
import MembreService from '../modules/membres/service';
import e = require('express');

export class MembreController {

    private membre_service: MembreService = new MembreService();

    public create_membre(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.utilisateur && req.body.prenom && req.body.nom && req.body.email && req.body.role && req.body.organisation && req.body.date_fin && req.body.etat) {
            const membre_params: IMembre = {
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
            this.membre_service.createMembre(membre_params, (err: any, membre_data: IMembre) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create membre is successfull', membre_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_membre_by_id(req: Request, res: Response) {
        if (req.params.id) {
            const membre_filter = { _id: req.params.id };
            this.membre_service.filterMembre(membre_filter, (err: any, membre_data: IMembre) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter membre is successfull', membre_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_all_membre(req: Request, res: Response) {
	    this.membre_service.retrieveMembre((err: any, membre_data: IMembre) => {
	    	if (err) {
	    		mongoError(err, res);
	    	} else {
	    		successResponse('Retrieve membre is successfull', membre_data, res);
	    	}
	    });
    }

    public update_membre(req: Request, res: Response) {
        if (req.params.id && req.body.utilisateur || req.body.prenom || req.body.nom || req.body.email || req.body.role || req.body.organisation || req.body.date_fin || req.body.etat) {
            const membre_filter = { _id: req.params.id };
            this.membre_service.filterMembre(membre_filter, (err: any, membre_data: IMembre) => {
                if (err) {
                    mongoError(err, res);
                } else if (membre_data) {
                    membre_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'membre data updated'
                    });
                    const membre_params: IMembre = {
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
                    this.membre_service.updateMembre(membre_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update membre is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid membre', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_membre(req: Request, res: Response) {
        if (req.params.id) {
            this.membre_service.deleteMembre(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete membre successfull', null, res);
                } else {
                    failureResponse('invalid membre', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}