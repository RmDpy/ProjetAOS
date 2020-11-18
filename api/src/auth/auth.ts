import { mongoose } from 'mongoose'
import {Application, Request, Response} from "express";
import jwt = require('jsonwebtoken');
import { MembreController } from '../controllers/membreController';


export class Auth {

    private membre_controller: MembreController = new MembreController();

    public route(app: Application){
        app.post('/api/login', (req: Request, res: Response) => {
            this.membre_controller.getMembreEmailMdp(req, res);
        })
    }
}