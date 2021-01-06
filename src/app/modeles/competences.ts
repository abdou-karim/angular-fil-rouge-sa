export interface Competences{
id: number;
libelle: string;
description: string;
groupeCompetences: {
  id: number;
  libelle: string;
  description: string;
};
niveaux: {
  id: number;
  libelle: string;
  crictereDevaluation: string;
  groupeDaction: string;
};
}
