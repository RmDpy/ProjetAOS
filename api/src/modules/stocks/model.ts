import { ModificationNote } from "../common/model";

export interface IStock {
    _id?: String;
    magasin: String;
    emplacement: String;
    etat: String;
    reference: String;
    libelle: String;
    prix: String;
    stock_qt: String;
    stock_val: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}