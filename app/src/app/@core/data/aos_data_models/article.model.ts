export interface IArticle {
    _id?: String;
    reference: String;
    libelle: String;
    etat: String;
    fournisseur: String;
    organisation: String;
    prix: String;
    is_deleted?: Boolean;
    modification_notes: any[]
}

export interface IArticleTab {
   DATA: IArticle[];
   MESSAGE: String;
   STATUS : String;
}