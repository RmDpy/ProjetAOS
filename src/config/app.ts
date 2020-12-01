import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environment";
import { MagasinRoutes } from "../routes/magasin_routes";
import { ArticleRoutes } from "../routes/article_routes";
import { TransfertRoutes } from "../routes/transfert_routes";
import { HistoriqueRoutes } from "../routes/historique_routes";
import { FournisseurRoutes } from "../routes/fournisseur_routes";
import { RoleRoutes } from "../routes/role_routes";
import { MembreRoutes } from "../routes/membre_routes";
import { StockRoutes } from "../routes/stock_routes";
import { CommonRoutes } from "../routes/common_routes";
import * as path from "path";
class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb+srv://admin_bdd:admin_bdd@cluster0.aqzty.mongodb.net/db_gmao_prod?retryWrites=true&w=majority';

   private magasin_routes: MagasinRoutes = new MagasinRoutes();
   private article_routes: ArticleRoutes = new ArticleRoutes();
   private transfert_routes: TransfertRoutes = new TransfertRoutes();
   private historique_routes: HistoriqueRoutes = new HistoriqueRoutes();
   private fournisseur_routes: FournisseurRoutes = new FournisseurRoutes();
   private role_routes: RoleRoutes = new RoleRoutes();
   private membre_routes: MembreRoutes = new MembreRoutes();
   private stock_routes: StockRoutes = new StockRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.app.use(express.static(path.join(__dirname, "../../client/dist")));
      this.config();
      this.mongoSetup();
      this.magasin_routes.route(this.app);
      this.article_routes.route(this.app);
      this.transfert_routes.route(this.app);
      this.historique_routes.route(this.app);
      this.fournisseur_routes.route(this.app);
      this.membre_routes.route(this.app);
      this.role_routes.route(this.app);
      this.stock_routes.route(this.app);
      this.common_routes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
      console.log('DB path ' + this.mongoUrl);
   }

}
export default new App().app;