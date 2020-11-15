import { Application, Request, Response } from 'express';
import { TransfertController } from '../controllers/transfertController';

export class TransfertRoutes {

    private transfert_controller: TransfertController = new TransfertController();

    public route(app: Application) {
        
        app.post('/api/transfert', (req: Request, res: Response) => {
            this.transfert_controller.create_transfert(req, res);
        });

        app.get('/api/transfert', (req: Request, res: Response) => {
            this.transfert_controller.get_all_transfert(req, res);
        });

        app.get('/api/transfert/:id', (req: Request, res: Response) => {
            this.transfert_controller.get_transfert_by_id(req, res);
        });

        app.put('/api/transfert/:id', (req: Request, res: Response) => {
            this.transfert_controller.update_transfert(req, res);
        });

        app.delete('/api/transfert/:id', (req: Request, res: Response) => {
            this.transfert_controller.delete_transfert(req, res);
        });

    }
}