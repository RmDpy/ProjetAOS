import { IMagasin } from './model';
import magasins from './schema';

export default class MagasinService {
    
    public createMagasin(magasin_params: IMagasin, callback: any) {
        const _session = new magasins(magasin_params);
        _session.save(callback);
    }

    public filterMagasin(query: any, callback: any) {
        magasins.findOne(query, callback);
    }

    public retrieveMagasin(query: any, callback: any) {
        magasins.find(query, callback);
    }

    public updateMagasin(magasin_params: IMagasin, callback: any) {
        const query = { _id: magasin_params._id };
        magasins.findOneAndUpdate(query, magasin_params, callback);
    }
    
    public deleteMagasin(_id: String, callback: any) {
        const query = { _id: _id };
        magasins.deleteOne(query, callback);
    }

}