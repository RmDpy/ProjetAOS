import { ModificationNote } from "../common/model";

export interface IStock {
    _id?: String;
    magasin: String;
    emplacement: String;
    reference: String;
    libelle: String;
    stock_qt: Number;
    stock_val: Number;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}