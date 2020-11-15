import { Application, Request, Response } from 'express';
import { RoleController } from '../controllers/roleController';

export class RoleRoutes {

    private role_controller: RoleController = new RoleController();

    public route(app: Application) {
        
        app.post('/api/role', (req: Request, res: Response) => {
            this.role_controller.create_role(req, res);
        });

        app.get('/api/role', (req: Request, res: Response) => {
          this.role_controller.get_all_role(req, res);
        });

        app.get('/api/role/:id', (req: Request, res: Response) => {
            this.role_controller.get_role_by_id(req, res);
        });

        app.put('/api/role/:id', (req: Request, res: Response) => {
            this.role_controller.update_role(req, res);
        });

        app.delete('/api/role/:id', (req: Request, res: Response) => {
            this.role_controller.delete_role(req, res);
        });

    }
}