import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IArticle } from '../modules/articles/model';
import ArticleService from '../modules/articles/service';
import e = require('express');

export class ArticleController {

    private article_service: ArticleService = new ArticleService();

    public create_article(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.reference && req.body.libelle && req.body.etat && req.body.fournisseur && req.body.organisation && req.body.prix) {
            const article_params: IArticle = {
                reference: req.body.reference,
                libelle: req.body.libelle,
                etat: req.body.etat,
                fournisseur: req.body.fournisseur,
                organisation: req.body.organisation,
                prix: req.body.prix,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New article created'
                }]
            };
            this.article_service.createArticle(article_params, (err: any, article_data: IArticle) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create article is successfull', article_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_article_by_id(req: Request, res: Response) {
        if (req.params.id) {
            const article_filter = { _id: req.params.id };
            this.article_service.filterArticle(article_filter, (err: any, article_data: IArticle) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter article is successfull', article_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_all_article(req: Request, res: Response) {
        const article_filter = req.params;
        this.article_service.retrieveArticle(article_filter, (err: any, article_data: IArticle) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('Retrieve article is successfull', article_data, res);
            }
        });
    }

    public update_article(req: Request, res: Response) {
        if (req.params.id && req.body.reference || req.body.libelle || req.body.etat || req.body.fournisseur || req.body.organisation || req.body.prix ) {
            const article_filter = { _id: req.params.id };
            this.article_service.filterArticle(article_filter, (err: any, article_data: IArticle) => {
                if (err) {
                    mongoError(err, res);
                } else if (article_data) {
                    article_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'article data updated'
                    });
                    const article_params: IArticle = {
                        _id: req.params.id,
                        reference: req.body.reference ? req.body.reference : article_data.reference,
                        libelle: req.body.libelle ? req.body.libelle : article_data.libelle,
                        etat: req.body.etat ? req.body.etat : article_data.etat,
                        fournisseur: req.body.fournisseur ? req.body.fournisseur : article_data.fournisseur,
                        organisation: req.body.organisation ? req.body.organisation : article_data.organisation,
                        prix: req.body.prix ? req.body.prix : article_data.prix,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : article_data.is_deleted,
                        modification_notes: article_data.modification_notes
                    };
                    this.article_service.updateArticle(article_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update article is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid article', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_article_by_fournisseur(req: Request, res: Response) {
        const article_filter = { fournisseur: req.params.fournisseur };
        this.article_service.filterArticle(article_filter, (err: any, article_data: IArticle) => {
            if (err) {
                mongoError(err, res);
            } else if (article_data) {
                article_data.modification_notes.push({
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'article data updated by magasin'
                });
                const article_params: any = {
                    fournisseur: req.body.fournisseur ? req.body.fournisseur : article_data.fournisseur,
                    etat: "Inactif"
                };
                this.article_service.updateVariousArticle(article_params, (err: any) => {
                    if (err) {
                        mongoError(err, res);
                    } else {
                        successResponse('update article by fournisseur is successfull', null, res);
                    }
                });
            } else {
                failureResponse('invalid article', null, res);
            }
        });
    }

    public delete_article(req: Request, res: Response) {
        if (req.params.id) {
            this.article_service.deleteArticle(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete article successfull', null, res);
                } else {
                    failureResponse('invalid article', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}