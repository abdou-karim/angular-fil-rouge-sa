export interface Utilisateur {
  photo: any;
  username: string;
  email: string;
  fisrtname: string;
  lastname: string;
  profils: {
    id: number,
    libelle: string
  };
  profilSortie: {
    libelle: string
  };
  groupes: [
    {
      nom: string;
      status: string;
      typeDeGroupe: string;
    }
  ];
  genre: string;
  adresse: string;
  telephone: string;
  statut: string;
  token: string;
}
