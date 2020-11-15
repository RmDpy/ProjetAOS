import { Application, Request, Response } from 'express';
import { FournisseurController } from '../controllers/fournisseurController';

export class FournisseurRoutes {

    private fournisseur_controller: FournisseurController = new FournisseurController();

    public route(app: Application) {
        
        app.post('/api/fournisseur', (req: Request, res: Response) => {
            this.fournisseur_controller.create_fournisseur(req, res);
        });

        app.get('/api/fournisseur', (req: Request, res: Response) => {
            this.fournisseur_controller.get_all_fournisseur(req, res);
        });

        app.get('/api/fournisseur/:id', (req: Request, res: Response) => {
            this.fournisseur_controller.get_fournisseur_by_id(req, res);
        });

        app.put('/api/fournisseur/:id', (req: Request, res: Response) => {
            this.fournisseur_controller.update_fournisseur(req, res);
        });

        app.delete('/api/fournisseur/:id', (req: Request, res: Response) => {
            this.fournisseur_controller.delete_fournisseur(req, res);
        });

    }
}