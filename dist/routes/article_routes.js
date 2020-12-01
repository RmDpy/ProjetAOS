"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRoutes = void 0;
const articleController_1 = require("../controllers/articleController");
class ArticleRoutes {
    constructor() {
        this.article_controller = new articleController_1.ArticleController();
    }
    route(app) {
        app.post('/api/article', (req, res) => {
            this.article_controller.create_article(req, res);
        });
        app.get('/api/article', (req, res) => {
            this.article_controller.get_all_article(req, res);
        });
        app.get('/api/article/:id', (req, res) => {
            this.article_controller.get_article_by_id(req, res);
        });
        app.get('/api/article/query/:reference', (req, res) => {
            this.article_controller.get_article_by_reference(req, res);
        });
        app.put('/api/article/:id', (req, res) => {
            this.article_controller.update_article(req, res);
        });
        app.put('/api/article/query/:fournisseur', (req, res) => {
            this.article_controller.update_article_by_fournisseur(req, res);
        });
        app.delete('/api/article/:id', (req, res) => {
            this.article_controller.delete_article(req, res);
        });
    }
}
exports.ArticleRoutes = ArticleRoutes;
