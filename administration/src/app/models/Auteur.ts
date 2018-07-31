export interface Auteur {
    success: boolean,
    auteurFound: [{
        id: number,
        nom: string,
        prenom: string,
        domaine: string,
        groupe_de_recherche: string,
        specialite: string,
        grade: string,
        etablissement: string,
        diplome_en_preparation: string,
        tel: string,
        email: string,
        image: string
    }]
}