import { ModificationNote } from "../common/model";

export interface IHistorique {
    _id?: String;
    date?: String;
    reference: String;
    libelle: String;
    mouvement: String;
    quantite: Number;
    magasin: String;
    etat: String,
    num_bon: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}