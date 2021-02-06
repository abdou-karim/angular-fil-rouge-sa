export interface Referentiels{
  id: number;
  libelle: string;
  presentation: string;
  cricterDadmissions: [
    {
      id: number;
      libelle: string;
    }
  ];
  cricterDevaluations: [{
    id: number;
    libelle: string;
  }];
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
