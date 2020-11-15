export interface IRole {
    _id?: String;
    role: String;
    libelle: String;
    domaine: String;
    droit: String;
    default: Boolean;
    membres: Number;
    is_deleted?: Boolean;
    modification_notes: any[]
}

export interface IRoleTab {
   DATA: IRole[];
   MESSAGE: String;
   STATUS : String;
}