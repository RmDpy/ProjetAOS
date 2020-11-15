import { IFournisseur } from './model';
import fournisseurs from './schema';

export default class FournisseurService {
    
    public createFournisseur(fournisseur_params: IFournisseur, callback: any) {
        const _session = new fournisseurs(fournisseur_params);
        _session.save(callback);
    }

    public filterFournisseur(query: any, callback: any) {
        fournisseurs.findOne(query, callback);
    }

    public retrieveFournisseur(query: any) {
        fournisseurs.find(query);
    }

    public updateFournisseur(fournisseur_params: IFournisseur, callback: any) {
        const query = { _id: fournisseur_params._id };
        fournisseurs.findOneAndUpdate(query, fournisseur_params, callback);
    }
    
    public deleteFournisseur(_id: String, callback: any) {
        const query = { _id: _id };
        fournisseurs.deleteOne(query, callback);
    }

}