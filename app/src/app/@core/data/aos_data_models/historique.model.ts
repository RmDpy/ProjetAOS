export interface IHistorique {
    _id?: String;
    date: String;
    reference: String;
    libelle: String;
    mouvement: String;
    quantite: String;
    magasin: String;
    emplacement: String;
    num_bon: String;
    is_deleted?: Boolean;
    modification_notes: any[]
}

export interface IHistoriqueTab {
   DATA: IHistorique[];
   MESSAGE: String;
   STATUS : String;
}