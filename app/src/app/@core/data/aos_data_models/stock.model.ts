export interface IStock {
    _id?: String;
    emplacement: String;
    etat: String;
    reference: String;
    libelle: String;
    prix: String;
    stock_qt: String;
    stock_val: String;
    is_deleted?: Boolean;
    modification_notes: any[]
}
export interface IStockTab {
   DATA: IStock[];
   MESSAGE: String;
   STATUS : String;
}