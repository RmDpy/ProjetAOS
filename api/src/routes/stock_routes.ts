import { Application, Request, Response } from 'express';
import { StockController } from '../controllers/stockController';

export class StockRoutes {

    private stock_controller: StockController = new StockController();

    public route(app: Application) {
        
        app.post('/api/stock', (req: Request, res: Response) => {
            this.stock_controller.create_stock(req, res);
        });

        app.get('/api/stock/:id', (req: Request, res: Response) => {
            this.stock_controller.get_stock(req, res);
        });

        app.put('/api/stock/:id', (req: Request, res: Response) => {
            this.stock_controller.update_stock(req, res);
        });

        app.delete('/api/stock/:id', (req: Request, res: Response) => {
            this.stock_controller.delete_stock(req, res);
        });

    }
}