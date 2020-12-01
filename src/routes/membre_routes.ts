import { Application, Request, Response } from 'express';
import { MembreController } from '../controllers/membreController';

export class MembreRoutes {

    private membre_controller: MembreController = new MembreController();

    public route(app: Application) {
        
        app.post('/api/membre', (req: Request, res: Response) => {
            this.membre_controller.create_membre(req, res);
        });

        app.get('/api/membre', (req: Request, res: Response) => {
            this.membre_controller.get_all_membre(req, res);
        });

        app.get('/api/membre/:id', (req: Request, res: Response) => {
            this.membre_controller.get_membre_by_id(req, res);
        });

        app.put('/api/membre/:id', (req: Request, res: Response) => {
            this.membre_controller.update_membre(req, res);
        });

        app.delete('/api/membre/:id', (req: Request, res: Response) => {
            this.membre_controller.delete_membre(req, res);
        });

    }
}