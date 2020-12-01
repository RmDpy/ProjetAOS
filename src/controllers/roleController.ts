import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IRole } from '../modules/roles/model';
import RoleService from '../modules/roles/service';
import e = require('express');

export class RoleController {

    private role_service: RoleService = new RoleService();

    public create_role(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.role && req.body.libelle && req.body.domaine && req.body.droit && req.body.default && req.body.membres) {
            const role_params: IRole = {
                role: req.body.role,
                libelle: req.body.libelle,
                domaine: req.body.domaine,
                droit: req.body.droit,
                default: req.body.default,
                membres: req.body.membres,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New role created'
                }]
            };
            this.role_service.createRole(role_params, (err: any, role_data: IRole) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create role is successfull', role_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_role_by_id(req: Request, res: Response) {
        if (req.params.id) {
            const role_filter = { _id: req.params.id };
            this.role_service.filterRole(role_filter, (err: any, role_data: IRole) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter role is successfull', role_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_role_by_role(req: Request, res: Response) {
        if (req.params.role) {
            const role_filter = { role: req.params.role };
            this.role_service.filterRole(role_filter, (err: any, role_data: IRole) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('Filter role is successfull', role_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_all_role(req: Request, res: Response) {
        const role_filter = req.params;
        this.role_service.retrieveRole(role_filter, (err: any, role_data: IRole) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('Retrieve role is successfull', role_data, res);
            }
        });
    }

    public update_role(req: Request, res: Response) {
        if (req.params.id && req.body.role || req.body.libelle || req.body.domaine || req.body.droit || req.body.default || req.body.membres ) {
            const role_filter = { _id: req.params.id };
            this.role_service.filterRole(role_filter, (err: any, role_data: IRole) => {
                if (err) {
                    mongoError(err, res);
                } else if (role_data) {
                    role_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'role data updated'
                    });
                    const role_params: IRole = {
                        _id: req.params.id,
                        role: req.body.role ? req.body.role : role_data.role,
                        libelle: req.body.libelle ? req.body.libelle : role_data.libelle,
                        domaine: req.body.domaine ? req.body.domaine : role_data.domaine,
                        droit: req.body.droit ? req.body.droit : role_data.droit,
                        default: req.body.default ? req.body.default : role_data.default,
                        membres: req.body.membres ? req.body.membres : role_data.membres,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : role_data.is_deleted,
                        modification_notes: role_data.modification_notes
                    };
                    this.role_service.updateRole(role_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update role is successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid role', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_role(req: Request, res: Response) {
        if (req.params.id) {
            this.role_service.deleteRole(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete role successfull', null, res);
                } else {
                    failureResponse('invalid role', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}