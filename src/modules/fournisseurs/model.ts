import { ModificationNote } from "../common/model";

export interface IFournisseur {
    _id?: String;
    code: String;
    nom: String;
    etat: String;
    pays: String;
    devise: String;
    fabriquant: Boolean;
    sav: Boolean;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}