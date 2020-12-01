"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class ArticleService {
    createArticle(article_params, callback) {
        const _session = new schema_1.default(article_params);
        _session.save(callback);
    }
    filterArticle(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    retrieveArticle(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateArticle(article_params, callback) {
        const query = { _id: article_params._id };
        schema_1.default.findOneAndUpdate(query, article_params, callback);
    }
    deleteArticle(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = ArticleService;
