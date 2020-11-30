import { ModificationNote } from "../common/model";

export interface IArticle {
    _id?: String;
    reference: String;
    libelle: String;
    etat: String;
    fournisseur: String;
    organisation: String;
    prix: Number;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}