export type PackSpaceConfig = {
  [key: string]: {
    mainSpace?: string;
    secondarySpace?: string;
    tertiarySpace?: string;
  };
};

export const packSpaceLabels: PackSpaceConfig = {
  'Pack Prestige': {
    mainSpace: 'ESPACE CHEMISE',
    secondarySpace: 'ESPACE ACCESSOIRE',
    tertiarySpace: 'ESPACE ACCESSOIRE'
  },
  'Pack Premium': {
    mainSpace: 'ESPACE ACCESSOIRE',
    secondarySpace: 'ESPACE PORTEFEUILLE',
    tertiarySpace: 'ESPACE ACCESSOIRE'
  },
  'Pack Trio': {
    mainSpace: 'ESPACE CEINTURE',
    secondarySpace: 'ESPACE PORTEFEUILLE',
    tertiarySpace: 'ESPACE PORTE-CLÉS'
  },
  'Pack Duo': {
    mainSpace: 'ESPACE PORTEFEUILLE',
    secondarySpace: 'ESPACE CEINTURE'
  },
  'Pack Mini Duo': {
    mainSpace: 'ESPACE PORTE-CARTES',
    secondarySpace: 'ESPACE PORTE-CLÉS'
  },
  'Pack Chemise': {
    mainSpace: 'ESPACE CHEMISE'
  },
  'Pack Ceinture': {
    mainSpace: 'ESPACE CEINTURE'
  },
  'Pack Cravatte': {
    mainSpace: 'ESPACE ACCESSOIRE'
  },
  'Pack Malette': {
    mainSpace: 'ESPACE MALETTE'
  },
  'Pack Portefeuille': {
    mainSpace: 'ESPACE PORTEFEUILLE'
  },
  'Pack Porte-carte': {
    mainSpace: 'ESPACE PORTE-CARTE'
  },
  'Pack Porte-clé': {
    mainSpace: 'ESPACE PORTE-CLÉ'
  }
};