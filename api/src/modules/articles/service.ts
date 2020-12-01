import { IArticle } from './model';
import articles from './schema';

export default class ArticleService {
    
    public createArticle(article_params: IArticle, callback: any) {
        const _session = new articles(article_params);
        _session.save(callback);
    }

    public filterArticle(query: any, callback: any) {
        articles.findOne(query, callback);
    }

    public retrieveArticle(query: any, callback: any) {
        articles.find(query, callback);
    }

    public updateArticle(article_params: IArticle, callback: any) {
        const query = { _id: article_params._id };
        articles.findOneAndUpdate(query, article_params, callback);
    }

    public updateVariousArticle(article_params: IArticle, callback: any) {
        const query = { fournisseur: article_params.fournisseur };
        articles.updateMany(query, article_params, callback);
    }
    
    public deleteArticle(_id: String, callback: any) {
        const query = { _id: _id };
        articles.deleteOne(query, callback);
    }

}