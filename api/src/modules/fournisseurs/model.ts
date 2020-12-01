import { ModificationNote } from "../common/model";

export interface IFournisseur {
    _id?: String;
    code: String;
    nom: String;
    pays: String;
    devise: String;
    fabriquant: Boolean;
    sav: Boolean;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}