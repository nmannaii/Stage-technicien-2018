export interface GpeDeRecherche {
    success: boolean,
    gpeDeRech: [{
        denomination : string,
        abreviation : string,
        tel : string,
        fax : string,
        email : string,
        objectif : string,
        mots_cles : string,
        responsable : string
    }]
}