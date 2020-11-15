import { ModificationNote } from "../common/model";

export interface IHistorique {
    _id?: String;
    date: Date;
    reference: String;
    libelle: String;
    mouvement: String;
    quantite: String;
    magasin: String;
    emplacement: String;
    num_bon: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}