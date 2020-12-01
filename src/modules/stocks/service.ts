import { IStock } from './model';
import stocks from './schema';

export default class StockService {
    
    public createStock(stock_params: IStock, callback: any) {
        const _session = new stocks(stock_params);
        _session.save(callback);
    }

    public filterStock(query: any, callback: any) {
        stocks.findOne(query, callback);
    }

    public filterNumStock(query: any, callback: any) {
        stocks.find(query, callback);
    }

    public retrieveStock(query: any, callback: any) {
        stocks.find(query, callback);
    }

    public updateStock(stock_params: IStock, callback: any) {
        const query = { _id: stock_params._id };
        stocks.findOneAndUpdate(query, stock_params, callback);
    }
    
    public deleteStock(_id: String, callback: any) {
        const query = { _id: _id };
        stocks.deleteOne(query, callback);
    }

    public deleteMagasinStock(magasin: String, callback: any) {
        const query = { magasin: magasin };
        stocks.deleteMany(query, callback);
    }

}