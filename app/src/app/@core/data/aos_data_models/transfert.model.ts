export interface ITransfert {
    _id?: String;
    reference: String;
    libelle: String;
    quantite: String;
    mag_fournisseur: String;
    mag_demandeur: String;
    emplacement: String;
    auteur: String;
    num_bon: String;
    is_deleted?: Boolean;
    modification_notes: any[]
}

export interface ITransfertTab {
   DATA: ITransfert[];
   MESSAGE: String;
   STATUS : String;
}