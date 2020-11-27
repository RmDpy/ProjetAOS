import { IHistorique } from './model';
import historiques from './schema';

export default class HistoriqueService {
    
    public createHistorique(historique_params: IHistorique, callback: any) {
        const _session = new historiques(historique_params);
        _session.save(callback);
    }

    public filterHistorique(query: any, callback: any) {
        historiques.findOne(query, callback);
    }

    public retrieveHistorique(query: any, callback: any) {
        historiques.find(query, callback);
    }

    public updateHistorique(historique_params: IHistorique, callback: any) {
        const query = { _id: historique_params._id };
        historiques.findOneAndUpdate(query, historique_params, callback);
    }
    
    public deleteHistorique(_id: String, callback: any) {
        const query = { _id: _id };
        historiques.deleteOne(query, callback);
    }

}