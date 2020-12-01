import { Application, Request, Response } from 'express';
import { HistoriqueController } from '../controllers/historiqueController';

export class HistoriqueRoutes {

    private historique_controller: HistoriqueController = new HistoriqueController();

    public route(app: Application) {
        
        app.post('/api/historique', (req: Request, res: Response) => {
            this.historique_controller.create_historique(req, res);
        });

        app.get('/api/historique', (req: Request, res: Response) => {
            this.historique_controller.get_all_historique(req, res);
        });

        app.get('/api/historique/:id', (req: Request, res: Response) => {
            this.historique_controller.get_historique_by_id(req, res);
        });

        app.get('/api/stock/query/:date/:reference/:magasin:/:quantite', (req: Request, res: Response) => {
            this.historique_controller.get_historique_by_params(req, res);
        });

        app.put('/api/historique/:id', (req: Request, res: Response) => {
            this.historique_controller.update_historique(req, res);
        });

        app.put('/api/historique/query/:magasin', (req: Request, res: Response) => {
            this.historique_controller.update_historique_by_magasin(req, res);
        });

        app.delete('/api/historique/:id', (req: Request, res: Response) => {
            this.historique_controller.delete_historique(req, res);
        });

    }
}