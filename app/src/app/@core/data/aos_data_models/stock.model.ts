export interface IStock {
    _id?: String;
    magasin: String;
    emplacement: String;
    reference: String;
    libelle: String;
    prix: Number;
    stock_qt: Number;
    stock_val: Number;
    is_deleted?: Boolean;
    modification_notes: any[]
}
export interface IStockTab {
   DATA: IStock[];
   MESSAGE: String;
   STATUS : String;
}