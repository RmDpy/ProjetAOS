import { ITransfert } from './model';
import transferts from './schema';

export default class TransfertService {
    
    public createTransfert(transfert_params: ITransfert, callback: any) {
        const _session = new transferts(transfert_params);
        _session.save(callback);
    }

    public filterTransfert(query: any, callback: any) {
        transferts.findOne(query, callback);
    }

    public retrieveTransfert(query: any, callback: any) {
        transferts.find(query, callback);
    }

    public updateTransfert(transfert_params: ITransfert, callback: any) {
        const query = { _id: transfert_params._id };
        transferts.findOneAndUpdate(query, transfert_params, callback);
    }
    
    public deleteTransfert(_id: String, callback: any) {
        const query = { _id: _id };
        transferts.deleteOne(query, callback);
    }

}