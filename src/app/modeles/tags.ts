export interface Tags{
  id: number;
  libelle: string;
  descriptif: string;
  groupeCompetence: {
    id: number;
    libelle: string;
    description: string;
  };
  groupeTags: {
    id: number;
    libelle: string;
  };
}
