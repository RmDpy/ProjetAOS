import { ModificationNote } from "../common/model";

export interface IMagasin {
    _id?: String;
    magasin: String;
    libelle: String;
    site: String;
    pays: String;
    responsable: String;
    stock_val: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}