export interface GroupeCompetence{
  id: number;
  libelle: string;
  description: string;
  competence: [{
    id: number;
    libelle: string;
    description: string;
    niveaux: {
      id: number;
      libelle: string;
      crictereDevaluation: string;
      groupeDaction: string;
    };
    groupeCompetences: {
      id: number;
      libelle: string;
      description: string;
    };
  }
  ];
  tags: [{
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
  }];
  referentiels: [{
    id: number;
    libelle: string;
    presentation: string;
    crictereAdmission: string;
    crictereEvaluation: string;
    groupeCompetences: {
      id: number;
      libelle: string;
      description: string;
    };
    promo: [{}];
    programme: any;
  }];
}
