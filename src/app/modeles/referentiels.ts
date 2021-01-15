export interface Referentiels{
  id: number;
  libelle: string;
  presentation: string;
  crictereAdmission: string;
  crictereEvaluation: string;
  groupeCompetence: [
    {
    id: number;
    libelle: string;
    description: string;
      Competence: [
        {
          id: number;
          libelle: string;
          description: string;
        }
      ];
  }
  ];
  programme: any;
}
