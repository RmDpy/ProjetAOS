export interface IMagasin {
    _id?: String;
    magasin: String;
    libelle: String;
    site: String;
    pays: String;
    responsable: String;
    stock_val: String;
    is_deleted?: Boolean;
    modification_notes: any[]
}

export interface IMagasinTab {
   DATA: IMagasin[];
   MESSAGE: String;
   STATUS : String;
}