import { Application, Request, Response } from 'express';
import { MagasinController } from '../controllers/magasinController';

export class MagasinRoutes {

    private magasin_controller: MagasinController = new MagasinController();

    public route(app: Application) {
        
        app.post('/api/magasin', (req: Request, res: Response) => {
            this.magasin_controller.create_magasin(req, res);
        });

        app.get('/api/magasin', (req: Request, res: Response) => {
            this.magasin_controller.get_all_magasin(req, res);
        });

        app.get('/api/magasin/:id', (req: Request, res: Response) => {
            this.magasin_controller.get_magasin_by_id(req, res);
        });

        app.get('/api/magasin/query/:magasin', (req: Request, res: Response) => {
            this.magasin_controller.get_magasin_by_magasin(req, res);
        });

        app.put('/api/magasin/:id', (req: Request, res: Response) => {
            this.magasin_controller.update_magasin(req, res);
        });

        app.delete('/api/magasin/:id', (req: Request, res: Response) => {
            this.magasin_controller.delete_magasin(req, res);
        });

    }
}