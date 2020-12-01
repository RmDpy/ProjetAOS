export interface IFournisseur {
    _id?: String;
    code: String;
    nom: String;
    pays: String;
    devise: String;
    fabriquant: Boolean;
    sav: Boolean;
    is_deleted?: Boolean;
    modification_notes: any[]
}

export interface IFournisseurTab {
   DATA: IFournisseur[];
   MESSAGE: String;
   STATUS : String;
}