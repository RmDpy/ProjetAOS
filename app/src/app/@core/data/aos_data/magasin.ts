
export abstract class MagasinData { //Abstraite, sa classe fille doit forcément redéfinir getData abstraite aussi. On ne touche à rien d'autre ici normalement, sauf le type.
  abstract getData(): any[]; //Type any, mais doit probabelemnt être redéfini en type Magasin, et ainsi de suite pour les autres modules (Articles, Membres etc)
} //Classe utilisée comme classe mére dans : app/@core/mock/aos_mock/magasin.service.ts => Ta prochaine étape pour finir le tour du proprio
