import { IMembre } from './model';
import membres from './schema';

export default class MembreService {
    
    public createMembre(membre_params: IMembre, callback: any) {
        const _session = new membres(membre_params);
        _session.save(callback);
    }

    public filterMembre(query: any, callback: any) {
        membres.findOne(query, callback);
    }

    public retrieveMembre(query: any) {
        membres.find(query);
    }

    public updateMembre(membre_params: IMembre, callback: any) {
        const query = { _id: membre_params._id };
        membres.findOneAndUpdate(query, membre_params, callback);
    }
    
    public deleteMembre(_id: String, callback: any) {
        const query = { _id: _id };
        membres.deleteOne(query, callback);
    }

    public authenticate({mail, mdp}){
        console.log('authenticate service');
        const user = membres.findOne({mail, mdp});
        if (user){
            return true;
        }
        else {
            return false;
        }

    }
}