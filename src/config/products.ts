import type { Product, ProductCategory } from '../types/product';

export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  'dattes-fraiches': 'Dattes Fraîches',
  'dattes-transformees': 'Dattes Transformées',
  'produits-derives': 'Produits Dérivés',
  'figues-sechees': 'Figues Séchées',
  'cafe-dattes': 'Café de Dattes',
  'sucre-dattes': 'Sucre de Dattes',
  'sirop-dattes': 'Sirop de Dattes',
  'tous': 'Tous les Produits'
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Paquet Dattes 1kg',
    description: 'Notre paquet de dattes Deglet Nour de 1kg offre des fruits charnus et sucrés, soigneusement sélectionnés dans les palmeraies tunisiennes. Récoltées à maturité optimale, ces dattes premium sont naturellement riches en minéraux et glucides, idéales pour une consommation quotidienne ou pour enrichir vos préparations culinaires.',
    image: '/produits/PaquetDattes.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'dattes-fraiches',
    subcategory: 'paquet',
    certifications: ['Bio', 'Fair Trade'],
    weight: '1kg',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour de Tunisie 100% naturelles',
      'Sans additifs ni conservateurs',
      'Non traitées après récolte',
      'Conditionnées dans un environnement contrôlé'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '2',
    title: 'Paquet Dattes 500g',
    description: 'Format pratique de 500g de nos dattes Deglet Nour, idéal pour les petites familles ou une consommation modérée. Ces dattes tunisiennes de première qualité se distinguent par leur texture moelleuse et leur saveur caramélisée naturelle. Parfait comme en-cas nutritif ou pour agrémenter vos pâtisseries et plats salés-sucrés.',
    image: '/produits/PaquetDattes.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'dattes-fraiches',
    subcategory: 'paquet',
    certifications: ['Bio', 'Fair Trade'],
    weight: '500g',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour de Tunisie 100% naturelles',
      'Sans additifs ni conservateurs',
      'Non traitées après récolte',
      'Emballées sous atmosphère protectrice'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  
  // Dattes - Coffrets
  {
    id: '3',
    title: 'Coffret Dattes 1kg (Bleu)',
    description: 'Notre coffret premium bleu contient 1kg de dattes Deglet Nour d\'exception, soigneusement sélectionnées pour leur taille, leur brillance et leur saveur incomparable. Présentées dans un écrin élégant, ces dattes sont le cadeau parfait pour les occasions spéciales. Chaque fruit est charnu, avec une texture mielleuse et des notes subtiles de caramel naturel.',
    image: '/produits/BarquetteDattesDen.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'dattes-fraiches',
    subcategory: 'coffret-cadeaux',
    certifications: ['Bio', 'Fair Trade'],
    weight: '1kg',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour premium de Tunisie sélection supérieure',
      'Sans additifs ni conservateurs',
      'Conditionnées à la main',
      'Récoltées à pleine maturité et triées individuellement'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '4',
    title: 'Coffret Dattes 500g (Vert)',
    description: 'Élégant coffret vert renfermant 500g de nos dattes Deglet Nour les plus exquises. Ce format raffiné est conçu pour les amateurs de saveurs authentiques et les occasions spéciales. Chaque datte est sélectionnée pour sa texture parfaite, son goût équilibré et sa chair généreuse, faisant de ce coffret un plaisir gustatif et visuel parfait à offrir.',
    image: '/produits/BarquetteDattesDen.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'dattes-fraiches',
    subcategory: 'coffret-cadeaux',
    certifications: ['Bio', 'Fair Trade'],
    weight: '500g',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour premium de Tunisie sélection supérieure',
      'Sans additifs ni conservateurs',
      'Conditionnées à la main',
      'Récoltées à pleine maturité et triées individuellement'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  
  // Dattes Transformées - Barquettes
  {
    id: '5',
    title: 'Barquette Dattes Dénoyautées 500g',
    description: 'Barquette pratique de 500g de dattes Deglet Nour dénoyautées, idéale pour une consommation directe ou pour vos préparations culinaires. Ces dattes soigneusement préparées conservent toute leur saveur et leur moelleux, tout en vous offrant un gain de temps considérable. Parfaites pour vos smoothies, pâtisseries ou comme en-cas énergétique.',
    image: '/produits/BarquetteDattesDen2.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'dattes-transformees',
    subcategory: 'barquette',
    certifications: ['Bio', 'Fair Trade'],
    weight: '500g',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour de Tunisie dénoyautées',
      'Sans additifs ni conservateurs',
      'Préparées dans des conditions d\'hygiène optimales',
      'Emballées sous atmosphère protectrice pour préserver leur fraîcheur'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '6',
    title: 'Barquette Dattes Dénoyautées 200g',
    description: 'Format compact de 200g de dattes dénoyautées en barquette, parfait pour une consommation individuelle ou pour précisément doser vos recettes. Ces dattes Deglet Nour sans noyau sont prêtes à l\'emploi pour vos créations culinaires ou comme collation naturellement sucrée. Leur texture fondante et leur goût authentique sont préservés grâce à notre processus de dénoyautage soigneux.',
    image: '/produits/BarquetteDattesDen2.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'dattes-transformees',
    subcategory: 'barquette',
    certifications: ['Bio', 'Fair Trade'],
    weight: '200g',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour de Tunisie dénoyautées',
      'Sans additifs ni conservateurs',
      'Préparées dans des conditions d\'hygiène optimales',
      'Conditionnement hermétique pour une fraîcheur maximale'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '7',
    title: 'Dattes Standard Dénoyautées 5kg',
    description: 'Conditionnement professionnel de 5kg de dattes dénoyautées, spécialement conçu pour les restaurants, les pâtisseries et les professionnels de l\'alimentation. Ces dattes Deglet Nour de qualité standard sont soigneusement dénoyautées et préparées pour une utilisation efficace en restauration. Idéales pour la préparation de desserts traditionnels, pâtisseries ou créations culinaires innovantes.',
    image: '/produits/DattesStandard.png',
    isOrganic: false,
    isFairTrade: true,
    category: 'dattes-transformees',
    certifications: ['Fair Trade'],
    weight: '5kg',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour de Tunisie dénoyautées qualité standard',
      'Sans conservateurs artificiels',
      'Préparées selon les normes d\'hygiène professionnelles',
      'Conditionnement spécial pour usage professionnel'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '8',
    title: 'Dattes Standard Dénoyautées 10kg',
    description: 'Notre conditionnement industriel de 10kg de dattes dénoyautées est la solution économique idéale pour les professionnels de l\'agroalimentaire et de la restauration collective. Ces dattes Deglet Nour de qualité standard maintiennent un bon équilibre entre qualité et prix, parfaites pour une utilisation à grande échelle. Emballées de façon pratique pour faciliter le stockage et l\'utilisation quotidienne en contexte professionnel.',
    image: '/produits/DattesStandard.png',
    isOrganic: false,
    isFairTrade: true,
    category: 'dattes-transformees',
    certifications: ['Fair Trade'],
    weight: '10kg',
    calories: {
      value: 306,
      unit: 'kcal/1279kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour de Tunisie dénoyautées qualité standard',
      'Sans conservateurs artificiels',
      'Triées mécaniquement pour garantir une qualité constante',
      'Emballage économique adapté au secteur professionnel'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '306', 
        unit: 'kcal/1279kJ',
        dailyValue: '15.3%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '70', 
        unit: 'g',
        dailyValue: '26.9%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '70', 
        unit: 'g',
        dailyValue: '77.8%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '2.2', 
        unit: 'g',
        dailyValue: '4.4%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '0.3%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  
  // Figues Séchées
  {
    id: '9',
    title: 'Figues Séchées 200g',
    description: 'Nos figues séchées de 200g sont un trésor de saveurs méditerranéennes, délicatement séchées au soleil selon des méthodes traditionnelles tunisiennes. Naturellement sucrées et charnues, ces figues conservent tous leurs nutriments et leur goût authentique. Riches en fibres et minéraux, elles constituent un en-cas sain ou un ingrédient parfait pour vos salades, desserts et plats mijotés.',
    image: '/produits/figues-sechees.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'figues-sechees',
    certifications: ['Bio', 'Fair Trade'],
    weight: '200g',
    calories: {
      value: 252,
      unit: 'kcal/1054kJ',
      per: '100g'
    },
    ingredients: [
      'Figues de Tunisie séchées au soleil',
      'Sans additifs ni conservateurs',
      'Sans sucre ajouté',
      'Séchées selon des méthodes traditionnelles respectueuses de l\'environnement'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '252', 
        unit: 'kcal/1054kJ',
        dailyValue: '12.6%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '50', 
        unit: 'g',
        dailyValue: '19.2%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '50', 
        unit: 'g',
        dailyValue: '55.6%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '3.4', 
        unit: 'g',
        dailyValue: '6.8%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '1.2', 
        unit: 'g',
        dailyValue: '1.7%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '10',
    title: 'Figues Séchées en Vrac',
    description: 'Nos figues séchées en vrac sont idéales pour les amateurs de fruits secs qui souhaitent une solution économique et écologique. Ces figues tunisiennes, séchées naturellement au soleil, offrent une texture tendre et un goût concentré caractéristique. Excellentes pour la cuisine, les salades, les tajines ou simplement comme collation nutritive, elles sont disponibles en différents conditionnements selon vos besoins de consommation.',
    image: '/produits/figues-sechees.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'figues-sechees',
    certifications: ['Bio', 'Fair Trade'],
    calories: {
      value: 252,
      unit: 'kcal/1054kJ',
      per: '100g'
    },
    ingredients: [
      'Figues de Tunisie séchées au soleil',
      'Sans additifs ni conservateurs',
      'Sans sucre ajouté',
      'Sélectionnées à la main pour garantir leur qualité'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '252', 
        unit: 'kcal/1054kJ',
        dailyValue: '12.6%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '50', 
        unit: 'g',
        dailyValue: '19.2%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '50', 
        unit: 'g',
        dailyValue: '55.6%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '6.25', 
        unit: 'g',
        dailyValue: '25%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '3.4', 
        unit: 'g',
        dailyValue: '6.8%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '1.2', 
        unit: 'g',
        dailyValue: '1.7%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.2', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  
  // Produits Dérivés
  {
    id: '11',
    title: 'Café de Noyaux de Dattes 200g',
    description: 'Notre café de noyaux de dattes est une alternative naturelle et sans caféine au café traditionnel. Préparé à partir de noyaux de dattes torréfiés et moulus avec soin selon un savoir-faire ancestral tunisien, cette boisson offre des notes douces, légèrement caramélisées avec une touche de noisette. Parfait pour les personnes sensibles à la caféine ou celles recherchant une boisson chaude originale aux vertus digestives.',
    image: '/produits/cafe-dattes.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'cafe-dattes',
    certifications: ['Bio', 'Fair Trade'],
    weight: '200g',
    calories: {
      value: 15,
      unit: 'kcal/63kJ',
      per: '100g'
    },
    ingredients: [
      'Noyaux de dattes Deglet Nour torréfiés et finement moulus (100%)',
      'Sans additifs ni arômes',
      'Sans caféine naturellement',
      'Torréfaction artisanale à basse température pour préserver les arômes'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '15', 
        unit: 'kcal/63kJ',
        dailyValue: '0.75%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '0.5', 
        unit: 'g',
        dailyValue: '0.2%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '0.5', 
        unit: 'g',
        dailyValue: '0.6%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '2.8', 
        unit: 'g',
        dailyValue: '11.2%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '0.5', 
        unit: 'g',
        dailyValue: '1%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.5', 
        unit: 'g',
        dailyValue: '0.7%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0.1', 
        unit: 'g',
        dailyValue: '0.5%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '12',
    title: 'Poudre (Sucre) de Dattes 300g',
    description: 'Notre sucre de dattes est un édulcorant 100% naturel obtenu par déshydratation et broyage minutieux de dattes Deglet Nour de première qualité. Contrairement au sucre raffiné, il conserve les minéraux, vitamines et fibres naturellement présents dans les dattes. Avec son indice glycémique plus bas et son pouvoir sucrant naturel, c\'est l\'allié idéal pour sucrer vos boissons, pâtisseries et desserts de façon plus saine.',
    image: '/produits/sucre-dattes.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'sucre-dattes',
    certifications: ['Bio', 'Fair Trade'],
    weight: '300g',
    calories: {
      value: 349,
      unit: 'kcal/1460kJ',
      per: '100g'
    },
    ingredients: [
      'Dattes Deglet Nour déshydratées et réduites en poudre (100%)',
      'Sans additifs ni conservateurs',
      'Sans sucres ajoutés',
      'Processus de séchage à basse température préservant les nutriments'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '349', 
        unit: 'kcal/1460kJ',
        dailyValue: '17.5%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '80.1', 
        unit: 'g',
        dailyValue: '30.8%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '80.1', 
        unit: 'g',
        dailyValue: '89%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '3.6', 
        unit: 'g',
        dailyValue: '14.4%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '0', 
        unit: 'g',
        dailyValue: '0%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.1', 
        unit: 'g',
        dailyValue: '0.1%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0', 
        unit: 'g',
        dailyValue: '0%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  },
  {
    id: '13',
    title: 'Sirop de Dattes 340ml',
    description: 'Notre sirop de dattes est un concentré naturel de saveurs obtenu par extraction soigneuse des jus de dattes Deglet Nour sélectionnées. Ce nectar ambré, légèrement visqueux et intensément parfumé constitue une alternative de choix au miel et aux sirops industriels. Idéal pour napper vos crêpes, aromatiser vos yaourts, enrichir vos marinades ou sucrer naturellement vos boissons et pâtisseries.',
    image: '/produits/sirop-dattes.png',
    isOrganic: true,
    isFairTrade: true,
    category: 'sirop-dattes',
    certifications: ['Bio', 'Fair Trade'],
    weight: '340ml',
    calories: {
      value: 300,
      unit: 'kcal/1255kJ',
      per: '100g'
    },
    ingredients: [
      'Extrait pur de dattes Deglet Nour (100%)',
      'Sans additifs ni conservateurs',
      'Sans sucres ajoutés',
      'Concentration naturelle par évaporation lente à basse température'
    ],
    nutritionFacts: [
      { 
        name: 'Énergie / Energie', 
        value: '300', 
        unit: 'kcal/1255kJ',
        dailyValue: '15%' 
      },
      { 
        name: 'Glucides / Carbohydrates', 
        value: '71', 
        unit: 'g',
        dailyValue: '27.3%' 
      },
      { 
        name: 'dont Sucres / Of which sugars', 
        value: '71', 
        unit: 'g',
        dailyValue: '78.9%' 
      },
      { 
        name: 'Fibres / Fiber', 
        value: '1.8', 
        unit: 'g',
        dailyValue: '7.2%' 
      },
      { 
        name: 'Protéines / Protein', 
        value: '1.29', 
        unit: 'g',
        dailyValue: '2.6%' 
      },
      { 
        name: 'Matières grasses / Fat', 
        value: '0.3', 
        unit: 'g',
        dailyValue: '0.4%' 
      },
      { 
        name: 'dont Acides gras saturés / Saturated fatty acids', 
        value: '0', 
        unit: 'g',
        dailyValue: '0%' 
      },
      { 
        name: 'Sel / Salt', 
        value: '0', 
        unit: 'g',
        dailyValue: '—' 
      }
    ]
  }
];

export const PRODUCT_TYPES: Record<string, string> = {
  'dattes-fraiches': 'Dattes Fraîches',
  'dattes-transformees': 'Dattes Transformées',
  'produits-derives': 'Produits Dérivés',
  'figues-sechees': 'Figues Séchées',
  'cafe-dattes': 'Café de Dattes',
  'sucre-dattes': 'Sucre de Dattes',
  'sirop-dattes': 'Sirop de Dattes',
  'tous': 'Tous les Produits'
};

export const NAVIGATION_STRUCTURE = [
  {
    label: 'Dattes',
    type: 'dattes',
    items: [
      { label: 'Dattes Fraîches', href: 'products', category: 'dattes-fraiches' },
      { label: 'Paquets', href: 'products', category: 'dattes-fraiches', subcategory: 'paquet' },
      { label: 'Coffrets Cadeaux', href: 'products', category: 'dattes-fraiches', subcategory: 'coffret-cadeaux' },
      { label: 'Dattes Transformées', href: 'products', category: 'dattes-transformees' },
      { label: 'Barquettes', href: 'products', category: 'dattes-transformees', subcategory: 'barquette' }
    ]
  },
  {
    label: 'Figues Séchées',
    type: 'figues-sechees',
    items: [
      { label: 'Figues Séchées', href: 'products', category: 'figues-sechees' }
    ]
  },
  {
    label: 'Produits Dérivés',
    type: 'produits-derives',
    items: [
      { label: 'Café de Dattes', href: 'products', category: 'cafe-dattes' },
      { label: 'Sucre de Dattes', href: 'products', category: 'sucre-dattes' },
      { label: 'Sirop de Dattes', href: 'products', category: 'sirop-dattes' }
    ]
  }
];

