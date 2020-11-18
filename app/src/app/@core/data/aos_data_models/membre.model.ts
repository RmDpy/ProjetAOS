export interface IMembre {
    _id?: String;
    utilisateur: String;
    prenom: String;
    nom: String;
    email: String;
    role: String;
    organisation: String;
    date_fin: String;
    etat: String;
    is_deleted?: Boolean;
    modification_notes: any[];
    password;
}

export interface IMembreTab {
   DATA: IMembre[];
   MESSAGE: String;
   STATUS : String;
}
