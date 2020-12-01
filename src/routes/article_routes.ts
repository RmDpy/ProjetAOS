import { Application, Request, Response } from 'express';
import { ArticleController } from '../controllers/articleController';

export class ArticleRoutes {

    private article_controller: ArticleController = new ArticleController();

    public route(app: Application) {
        
        app.post('/api/article', (req: Request, res: Response) => {
            this.article_controller.create_article(req, res);
        });

        app.get('/api/article', (req: Request, res: Response) => {
            this.article_controller.get_all_article(req, res);
        });

        app.get('/api/article/:id', (req: Request, res: Response) => {
            this.article_controller.get_article_by_id(req, res);
        });

        app.get('/api/article/query/:reference', (req: Request, res: Response) => {
            this.article_controller.get_article_by_reference(req, res);
        });

        app.put('/api/article/:id', (req: Request, res: Response) => {
            this.article_controller.update_article(req, res);
        });

        app.put('/api/article/query/:fournisseur', (req: Request, res: Response) => {
            this.article_controller.update_article_by_fournisseur(req, res);
        });

        app.delete('/api/article/:id', (req: Request, res: Response) => {
            this.article_controller.delete_article(req, res);
        });

    }
}