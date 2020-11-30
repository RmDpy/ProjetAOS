import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IHistorique } from '../modules/historiques/model';
import HistoriqueService from '../modules/historiques/service';
import e = require('express');

export class HistoriqueController {

    private historique_service: HistoriqueService = new HistoriqueService();

    public create_historique(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.reference && req.body.libelle && req.body.mouvement && req.body.quantite && req.body.magasin && req.body.etat && req.body.num_bon) {
            const historique_params: IHistorique = {
                date: this.generateDateNow(new Date(Date.now())),
                reference: req.body.reference,
                libelle: req.body.libelle,
                mouvement: req.body.mouvement,
                quantite: req.body.quantite,
                magasin: req.body.magasin,
                etat: req.body.etat,
                num_bon: req.body.num_bon,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New historique created'
                }]
            };
            this.historique_service.createHistorique(historique_params, (err: any, historique_data: IHistorique) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create historique is successfull', historique_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_historique_by_id(req: Request, res: Response) {
        if (req.params.id) {
            const historique_filter = { _id: req.params.id };
            this.historique_service.filterHistorique(historique_filter, (err: any, historique_data: IHistorique) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter historique is successfull', historique_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_historique_by_params(req: Request, res: Response) {
        if (req.params.date && req.params.reference && req.params.magasin && req.params.quantite) {
            const historique_filter = { date: req.params.date, reference: req.params.reference, magasin: req.params.magasin, quantite: req.params.quantite };
            this.historique_service.filterHistorique(historique_filter, (err: any, historique_data: IHistorique) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter historique by new params is successfull', historique_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_all_historique(req: Request, res: Response) {
        const historique_filter = req.params;
	    this.historique_service.retrieveHistorique(historique_filter, (err: any, historique_data: IHistorique) => {
	    	if (err) {
	    		mongoError(err, res);
	    	} else {
	    		successResponse('Retrieve historique is successfull', historique_data, res);
	    	}
	    });
    }

    public update_historique(req: Request, res: Response) {
        if (req.params.id && req.body.date || req.body.reference || req.body.libelle || req.body.mouvement || req.body.quantite || req.body.magasin || req.body.etat || req.body.num_bon) {
            const historique_filter = { _id: req.params.id };
            this.historique_service.filterHistorique(historique_filter, (err: any, historique_data: IHistorique) => {
                if (err) {
                    mongoError(err, res);
                } else if (historique_data) {
                    historique_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'historique data updated'
                    });
                    const historique_params: IHistorique = {
                        _id: req.params.id,
                        date: req.body.date ? req.body.date : historique_data.date,
                        reference: req.body.reference ? req.body.reference : historique_data.reference,
                        libelle: req.body.libelle ? req.body.libelle : historique_data.libelle,
                        mouvement: req.body.mouvement ? req.body.mouvement : historique_data.mouvement,
                        quantite: req.body.quantite ? req.body.quantite : historique_data.quantite,
                        magasin: req.body.magasin ? req.body.magasin : historique_data.magasin,
                        etat: req.body.etat ? req.body.etat : historique_data.etat,
                        num_bon: req.body.num_bon ? req.body.num_bon : historique_data.num_bon,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : historique_data.is_deleted,
                        modification_notes: historique_data.modification_notes
                    };
                    this.historique_service.updateHistorique(historique_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update historique is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid historique', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_historique_by_magasin(req: Request, res: Response) {
        const historique_filter = { magasin: req.params.magasin };
        this.historique_service.filterHistorique(historique_filter, (err: any, historique_data: IHistorique) => {
            if (err) {
                mongoError(err, res);
            } else if (historique_data) {
                historique_data.modification_notes.push({
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'historique data updated by magasin'
                });
                const historique_params: any = {
                    magasin: req.body.magasin ? req.body.magasin : historique_data.magasin,
                    etat: "Inactif"
                };
                this.historique_service.updateVariousHistorique(historique_params, (err: any) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse('update historique by magasin is successfull', null, res);
                    }
                });
            } else {
                failureResponse('invalid historique', null, res);
            }
        });
    }

    public delete_historique(req: Request, res: Response) {
        if (req.params.id) {
            this.historique_service.deleteHistorique(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete historique successfull', null, res);
                } else {
                    failureResponse('invalid historique', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    generateDateNow(date_ob): string{
        // adjust 0 before single digit date
        let day = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        // current hours
        let hours = date_ob.getHours();
        // current minutes
        let minutes = date_ob.getMinutes();
        // current seconds
        let seconds = date_ob.getSeconds();
        //final result
        return day + "-" + month + "-" + year + " (" + hours + ":" + minutes + ":" + seconds + ")";
      }
}