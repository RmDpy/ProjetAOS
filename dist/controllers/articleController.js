"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/articles/service");
class ArticleController {
    constructor() {
        this.article_service = new service_2.default();
    }
    create_article(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.reference && req.body.libelle && req.body.etat && req.body.fournisseur && req.body.organisation && req.body.prix) {
            const article_params = {
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
            this.article_service.createArticle(article_params, (err, article_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create article is successfull', article_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_article_by_id(req, res) {
        if (req.params.id) {
            const article_filter = { _id: req.params.id };
            this.article_service.filterArticle(article_filter, (err, article_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter article is successfull', article_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_article_by_reference(req, res) {
        if (req.params.reference) {
            const article_filter = { reference: req.params.reference };
            this.article_service.filterArticle(article_filter, (err, article_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Filter article by reference is successfull', article_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_all_article(req, res) {
        const article_filter = req.params;
        this.article_service.retrieveArticle(article_filter, (err, article_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('Retrieve article is successfull', article_data, res);
            }
        });
    }
    update_article(req, res) {
        if (req.params.id && req.body.reference || req.body.libelle || req.body.etat || req.body.fournisseur || req.body.organisation || req.body.prix) {
            const article_filter = { _id: req.params.id };
            this.article_service.filterArticle(article_filter, (err, article_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (article_data) {
                    article_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'article data updated'
                    });
                    const article_params = {
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
                    this.article_service.updateArticle(article_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('update article is successfull', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid article', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    update_article_by_fournisseur(req, res) {
        const article_filter = { fournisseur: req.params.fournisseur };
        this.article_service.filterArticle(article_filter, (err, article_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else if (article_data) {
                article_data.modification_notes.push({
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'article data updated by magasin'
                });
                const article_params = {
                    fournisseur: req.body.fournisseur ? req.body.fournisseur : article_data.fournisseur,
                    etat: "Inactif"
                };
                this.article_service.updateVariousArticle(article_params, (err) => {
                    if (err) {
                        service_1.mongoError(err, res);
                    }
                    else {
                        service_1.successResponse('update article by fournisseur is successfull', null, res);
                    }
                });
            }
            else {
                service_1.failureResponse('invalid article', null, res);
            }
        });
    }
    delete_article(req, res) {
        if (req.params.id) {
            this.article_service.deleteArticle(req.params.id, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete article successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid article', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.ArticleController = ArticleController;
