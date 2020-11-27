import { ModificationNote } from "../common/model";

export interface ITransfert {
    _id?: String;
    reference: String;
    libelle: String;
    quantite: Number;
    mag_fournisseur: String;
    mag_demandeur: String;
    emplacement: String;
    auteur: String;
    num_bon: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}