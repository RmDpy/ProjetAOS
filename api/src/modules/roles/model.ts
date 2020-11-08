import { ModificationNote } from "../common/model";

export interface IRole {
    _id?: String;
    role: String;
    libelle: String;
    domaine: String;
    droit: String;
    default: Boolean;
    membres: Number;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}