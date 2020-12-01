import { Application, Request, Response } from 'express';
import { StockController } from '../controllers/stockController';

export class StockRoutes {

    private stock_controller: StockController = new StockController();

    public route(app: Application) {
        
        app.post('/api/stock', (req: Request, res: Response) => {
            this.stock_controller.create_stock(req, res);
        });

        app.get('/api/stock', (req: Request, res: Response) => {
            this.stock_controller.get_all_stock(req, res);
        });

        app.get('/api/stock/:id', (req: Request, res: Response) => {
            this.stock_controller.get_stock_by_id(req, res);
        });

        app.get('/api/stock/magasin/:magasin_id', (req: Request, res: Response) => {
            this.stock_controller.get_stock_by_magasin(req, res);
        });

        app.get('/api/stock/query/:reference/:magasin', (req: Request, res: Response) => {
            this.stock_controller.get_stock_by_params(req, res);
        });

        app.put('/api/stock/:id', (req: Request, res: Response) => {
            this.stock_controller.update_stock(req, res);
        });

        app.delete('/api/stock/:id', (req: Request, res: Response) => {
            this.stock_controller.delete_stock(req, res);
        });

        app.delete('/api/stock/query/:magasin', (req: Request, res: Response) => {
            this.stock_controller.delete_by_magasin(req, res);
        });

    }
}