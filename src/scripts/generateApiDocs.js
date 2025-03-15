
const fs = require('fs');
const path = require('path');
const ApiDocGenerator = require('../utils/apiDocGenerator');
const { generateDocTemplate } = require('../utils/apiDocTemplate');
const { API_CONFIG } = require('../config/apiConfig');
const { generateClassDiagram } = require('../utils/classDiagramGenerator');

// Définir vos routes API ici - celles-ci seront utilisées pour générer la documentation
const apiRoutes = [
  // Routes d'authentification
  {
    method: 'post',
    path: '/users/login',
    description: 'Authentifie un utilisateur existant.',
    requestBody: {
      email: 'john@example.com',
      password: 'securepassword123'
    },
    response: {
      status: 200,
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2023-06-15T10:30:00Z'
      }
    }
  },
  {
    method: 'post',
    path: '/users/register',
    description: 'Enregistre un nouvel utilisateur.',
    requestBody: {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'securepassword123'
    },
    response: {
      status: 201,
      user: {
        id: 3,
        name: 'New User',
        email: 'newuser@example.com',
        role: 'user',
        createdAt: '2023-08-20T15:45:00Z'
      }
    }
  },
  {
    method: 'get',
    path: '/users',
    description: 'Récupère la liste de tous les utilisateurs avec leurs informations de base comme le nom, l\'email et le rôle.',
    response: {
      status: 200,
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'admin'
        }
      ]
    }
  },
  {
    method: 'get',
    path: '/users/:id',
    description: 'Récupère les informations détaillées d\'un utilisateur en fonction de son identifiant unique.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'utilisateur'
      }
    ],
    response: {
      status: 200,
      data: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: '2023-06-15T10:30:00Z'
      }
    }
  },
  {
    method: 'post',
    path: '/users',
    description: 'Crée un nouvel utilisateur dans la base de données avec un rôle par défaut "user".',
    requestBody: {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'securepassword123'
    },
    response: {
      status: 201,
      data: {
        id: 3,
        name: 'New User',
        email: 'newuser@example.com',
        role: 'user',
        createdAt: '2023-08-20T15:45:00Z'
      }
    }
  },
  {
    method: 'put',
    path: '/users/:id',
    description: 'Modifie les informations d\'un utilisateur existant comme le nom et l\'email.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'utilisateur'
      }
    ],
    requestBody: {
      name: 'Updated Name',
      email: 'updated@example.com'
    },
    response: {
      status: 200,
      data: {
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
        role: 'user',
        updatedAt: '2023-08-21T09:12:00Z'
      }
    }
  },
  {
    method: 'delete',
    path: '/users/:id',
    description: 'Supprime définitivement un utilisateur de la base de données.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'utilisateur'
      }
    ],
    response: {
      status: 204,
      message: 'User deleted successfully'
    }
  },
  {
    method: 'get',
    path: '/places',
    description: 'Récupère la liste de tous les lieux touristiques disponibles incluant leur nom, type, emplacement et description.',
    response: {
      status: 200,
      data: [
        {
          id: 1,
          name: 'Bulla Regia',
          type: 'historical',
          location: {
            latitude: 36.5594,
            longitude: 8.7553
          },
          description: 'Ancient Roman city with unique underground villas'
        },
        {
          id: 2,
          name: 'Ain Draham',
          type: 'natural',
          location: {
            latitude: 36.7828,
            longitude: 8.6875
          },
          description: 'Mountain town known for its forests and cool climate'
        }
      ]
    }
  },
  {
    method: 'get',
    path: '/places/:id',
    description: 'Récupère les informations détaillées d\'un lieu touristique incluant les images, horaires, tarifs et autres informations pratiques.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique du lieu'
      }
    ],
    response: {
      status: 200,
      data: {
        id: 1,
        name: 'Bulla Regia',
        type: 'historical',
        location: {
          latitude: 36.5594,
          longitude: 8.7553
        },
        description: 'Ancient Roman city with unique underground villas',
        images: [
          'https://example.com/bulla-regia-1.jpg',
          'https://example.com/bulla-regia-2.jpg'
        ],
        openingHours: {
          monday: '9:00 - 17:00',
          tuesday: '9:00 - 17:00',
          wednesday: '9:00 - 17:00',
          thursday: '9:00 - 17:00',
          friday: '9:00 - 17:00',
          saturday: '9:00 - 17:00',
          sunday: '9:00 - 17:00'
        },
        entranceFee: {
          adult: 10,
          child: 5,
          student: 7,
          senior: 7
        }
      }
    }
  },
  {
    method: 'post',
    path: '/places',
    description: 'Crée un nouveau lieu touristique dans la base de données avec ses informations de base.',
    requestBody: {
      name: 'New Place',
      type: 'cultural',
      location: {
        latitude: 36.5,
        longitude: 8.8
      },
      description: 'A new cultural attraction'
    },
    response: {
      status: 201,
      data: {
        id: 3,
        name: 'New Place',
        type: 'cultural',
        location: {
          latitude: 36.5,
          longitude: 8.8
        },
        description: 'A new cultural attraction',
        createdAt: '2023-08-22T11:30:00Z'
      }
    }
  },
  {
    method: 'put',
    path: '/places/:id',
    description: 'Met à jour les informations d\'un lieu touristique existant.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique du lieu'
      }
    ],
    requestBody: {
      name: 'Updated Place',
      type: 'historical',
      description: 'Updated description for this attraction'
    },
    response: {
      status: 200,
      data: {
        id: 1,
        name: 'Updated Place',
        type: 'historical',
        location: {
          latitude: 36.5594,
          longitude: 8.7553
        },
        description: 'Updated description for this attraction',
        updatedAt: '2023-08-23T14:20:00Z'
      }
    }
  },
  {
    method: 'delete',
    path: '/places/:id',
    description: 'Supprime un lieu touristique de la base de données.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique du lieu'
      }
    ],
    response: {
      status: 204,
      message: 'Place deleted successfully'
    }
  },
  {
    method: 'get',
    path: '/events',
    description: 'Récupère la liste de tous les événements programmés incluant leur titre, description, dates et emplacement.',
    response: {
      status: 200,
      data: [
        {
          id: 1,
          title: 'Cultural Festival',
          description: 'Annual cultural festival in Jendouba',
          startDate: '2023-09-15T18:00:00Z',
          endDate: '2023-09-17T22:00:00Z',
          location: 'Jendouba City Center'
        },
        {
          id: 2,
          title: 'Hiking Trip',
          description: 'Guided hiking trip in Ain Draham mountains',
          startDate: '2023-10-05T09:00:00Z',
          endDate: '2023-10-05T16:00:00Z',
          location: 'Ain Draham'
        }
      ]
    }
  },
  {
    method: 'get',
    path: '/events/:id',
    description: 'Récupère les détails d\'un événement spécifique.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'événement'
      }
    ],
    response: {
      status: 200,
      data: {
        id: 1,
        title: 'Cultural Festival',
        description: 'Annual cultural festival in Jendouba with local artists and traditional food',
        startDate: '2023-09-15T18:00:00Z',
        endDate: '2023-09-17T22:00:00Z',
        location: 'Jendouba City Center',
        organizer: 'Jendouba Cultural Association',
        ticketPrice: 10,
        capacity: 500,
        images: [
          'https://example.com/festival1.jpg',
          'https://example.com/festival2.jpg'
        ]
      }
    }
  },
  {
    method: 'post',
    path: '/events',
    description: 'Crée un nouvel événement dans la base de données.',
    requestBody: {
      title: 'New Event',
      description: 'Description of the new event',
      startDate: '2023-11-10T19:00:00Z',
      endDate: '2023-11-10T23:00:00Z',
      location: 'Bulla Regia Site'
    },
    response: {
      status: 201,
      data: {
        id: 3,
        title: 'New Event',
        description: 'Description of the new event',
        startDate: '2023-11-10T19:00:00Z',
        endDate: '2023-11-10T23:00:00Z',
        location: 'Bulla Regia Site',
        createdAt: '2023-08-24T10:15:00Z'
      }
    }
  },
  {
    method: 'put',
    path: '/events/:id',
    description: 'Met à jour les informations d\'un événement existant.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'événement'
      }
    ],
    requestBody: {
      title: 'Updated Event Title',
      description: 'Updated event description',
      location: 'New location'
    },
    response: {
      status: 200,
      data: {
        id: 1,
        title: 'Updated Event Title',
        description: 'Updated event description',
        startDate: '2023-09-15T18:00:00Z',
        endDate: '2023-09-17T22:00:00Z',
        location: 'New location',
        updatedAt: '2023-08-25T11:20:00Z'
      }
    }
  },
  {
    method: 'delete',
    path: '/events/:id',
    description: 'Supprime un événement de la base de données.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'événement'
      }
    ],
    response: {
      status: 204,
      message: 'Event deleted successfully'
    }
  },
  // Routes pour les sessions de messages
  {
    method: 'get',
    path: '/sessions',
    description: 'Récupère la liste de toutes les sessions de messages d\'un utilisateur.',
    response: {
      status: 200,
      data: [
        {
          id: 1,
          userId1: 1,
          userId2: 2,
          lastMessageAt: '2023-08-15T14:35:00Z',
          isActive: true,
          createdAt: '2023-08-15T14:30:00Z',
          user: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com'
          },
          lastMessage: {
            content: 'Bien sûr, comment puis-je vous aider?',
            senderId: 2,
            createdAt: '2023-08-15T14:35:00Z'
          }
        },
        {
          id: 2,
          userId1: 1,
          userId2: 3,
          lastMessageAt: '2023-08-26T16:40:00Z',
          isActive: true,
          createdAt: '2023-08-26T16:40:00Z',
          user: {
            id: 3,
            name: 'New User',
            email: 'newuser@example.com'
          },
          lastMessage: {
            content: 'Je voudrais plus d\'informations sur l\'événement du 15 septembre.',
            senderId: 1,
            createdAt: '2023-08-26T16:40:00Z'
          }
        }
      ]
    }
  },
  {
    method: 'get',
    path: '/sessions/:id',
    description: 'Récupère les détails d\'une session de messages spécifique.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de la session'
      }
    ],
    response: {
      status: 200,
      data: {
        id: 1,
        userId1: 1,
        userId2: 2,
        lastMessageAt: '2023-08-15T14:35:00Z',
        isActive: true,
        createdAt: '2023-08-15T14:30:00Z',
        user1: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        },
        user2: {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com'
        },
        messages: [
          {
            id: 1,
            sessionId: 1,
            senderId: 1,
            content: 'Bonjour, j\'ai une question sur Bulla Regia.',
            createdAt: '2023-08-15T14:30:00Z',
            read: true
          },
          {
            id: 2,
            sessionId: 1,
            senderId: 2,
            content: 'Bien sûr, comment puis-je vous aider?',
            createdAt: '2023-08-15T14:35:00Z',
            read: false
          }
        ]
      }
    }
  },
  {
    method: 'post',
    path: '/sessions',
    description: 'Crée une nouvelle session de messages entre deux utilisateurs.',
    requestBody: {
      userId1: 1,
      userId2: 3
    },
    response: {
      status: 201,
      data: {
        id: 3,
        userId1: 1,
        userId2: 3,
        lastMessageAt: null,
        isActive: true,
        createdAt: '2023-08-27T09:45:00Z'
      }
    }
  },
  {
    method: 'put',
    path: '/sessions/:id',
    description: 'Met à jour les informations d\'une session de messages.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de la session'
      }
    ],
    requestBody: {
      isActive: false
    },
    response: {
      status: 200,
      data: {
        id: 1,
        userId1: 1,
        userId2: 2,
        lastMessageAt: '2023-08-15T14:35:00Z',
        isActive: false,
        updatedAt: '2023-08-27T14:10:00Z'
      }
    }
  },
  {
    method: 'delete',
    path: '/sessions/:id',
    description: 'Supprime une session de messages de la base de données.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de la session'
      }
    ],
    response: {
      status: 204,
      message: 'Session deleted successfully'
    }
  },
  {
    method: 'get',
    path: '/messages',
    description: 'Récupère la liste de tous les messages envoyés dans l\'application JenCity.',
    response: {
      status: 200,
      data: [
        {
          id: 1,
          sessionId: 1,
          senderId: 1,
          content: 'Bonjour, j\'ai une question sur Bulla Regia.',
          createdAt: '2023-08-15T14:30:00Z',
          read: true
        },
        {
          id: 2,
          sessionId: 1,
          senderId: 2,
          content: 'Bien sûr, comment puis-je vous aider?',
          createdAt: '2023-08-15T14:35:00Z',
          read: false
        }
      ]
    }
  },
  {
    method: 'get',
    path: '/messages/:id',
    description: 'Récupère un message spécifique par son identifiant.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique du message'
      }
    ],
    response: {
      status: 200,
      data: {
        id: 1,
        sessionId: 1,
        senderId: 1,
        content: 'Bonjour, j\'ai une question sur Bulla Regia.',
        createdAt: '2023-08-15T14:30:00Z',
        read: true
      }
    }
  },
  {
    method: 'post',
    path: '/messages',
    description: 'Envoie un nouveau message à un utilisateur.',
    requestBody: {
      sessionId: 1,
      senderId: 1,
      content: 'Je voudrais plus d\'informations sur l\'événement du 15 septembre.'
    },
    response: {
      status: 201,
      data: {
        id: 3,
        sessionId: 1,
        senderId: 1,
        content: 'Je voudrais plus d\'informations sur l\'événement du 15 septembre.',
        createdAt: '2023-08-26T16:40:00Z',
        read: false
      }
    }
  },
  {
    method: 'put',
    path: '/messages/:id',
    description: 'Met à jour le statut de lecture d\'un message.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique du message'
      }
    ],
    requestBody: {
      read: true
    },
    response: {
      status: 200,
      data: {
        id: 2,
        sessionId: 1,
        senderId: 2,
        content: 'Bien sûr, comment puis-je vous aider?',
        createdAt: '2023-08-15T14:35:00Z',
        read: true,
        updatedAt: '2023-08-26T17:05:00Z'
      }
    }
  },
  {
    method: 'delete',
    path: '/messages/:id',
    description: 'Supprime un message de la base de données.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique du message'
      }
    ],
    response: {
      status: 204,
      message: 'Message deleted successfully'
    }
  },
  {
    method: 'get',
    path: '/reviews',
    description: 'Récupère la liste de toutes les avis et évaluations sur les lieux touristiques.',
    response: {
      status: 200,
      data: [
        {
          id: 1,
          userId: 1,
          placeId: 1,
          rating: 5,
          comment: 'Un site historique fascinant, je recommande vivement!',
          createdAt: '2023-07-20T10:15:00Z'
        },
        {
          id: 2,
          userId: 2,
          placeId: 2,
          rating: 4,
          comment: 'Très beau paysage, mais un peu difficile d\'accès.',
          createdAt: '2023-08-05T16:30:00Z'
        }
      ]
    }
  },
  {
    method: 'get',
    path: '/reviews/:id',
    description: 'Récupère un avis spécifique par son identifiant.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'avis'
      }
    ],
    response: {
      status: 200,
      data: {
        id: 1,
        userId: 1,
        placeId: 1,
        rating: 5,
        comment: 'Un site historique fascinant, je recommande vivement!',
        createdAt: '2023-07-20T10:15:00Z'
      }
    }
  },
  {
    method: 'post',
    path: '/reviews',
    description: 'Ajoute un nouvel avis sur un lieu touristique.',
    requestBody: {
      userId: 3,
      placeId: 1,
      rating: 4,
      comment: 'Très intéressant, bonne visite guidée.'
    },
    response: {
      status: 201,
      data: {
        id: 3,
        userId: 3,
        placeId: 1,
        rating: 4,
        comment: 'Très intéressant, bonne visite guidée.',
        createdAt: '2023-08-27T09:45:00Z'
      }
    }
  },
  {
    method: 'put',
    path: '/reviews/:id',
    description: 'Modifie un avis existant.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'avis'
      }
    ],
    requestBody: {
      rating: 5,
      comment: 'J\'ai changé d\'avis, c\'était vraiment excellent!'
    },
    response: {
      status: 200,
      data: {
        id: 2,
        userId: 2,
        placeId: 2,
        rating: 5,
        comment: 'J\'ai changé d\'avis, c\'était vraiment excellent!',
        createdAt: '2023-08-05T16:30:00Z',
        updatedAt: '2023-08-27T14:10:00Z'
      }
    }
  },
  {
    method: 'delete',
    path: '/reviews/:id',
    description: 'Supprime un avis de la base de données.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de l\'avis'
      }
    ],
    response: {
      status: 204,
      message: 'Review deleted successfully'
    }
  },
  {
    method: 'get',
    path: '/reservations',
    description: 'Récupère la liste de toutes les réservations d\'événements ou de visites.',
    response: {
      status: 200,
      data: [
        {
          id: 1,
          userId: 1,
          eventId: 1,
          numberOfTickets: 2,
          totalPrice: 20,
          status: 'confirmed',
          createdAt: '2023-08-10T11:20:00Z'
        },
        {
          id: 2,
          userId: 2,
          placeId: 1,
          visitDate: '2023-09-20T10:00:00Z',
          numberOfPersons: 3,
          totalPrice: 30,
          status: 'pending',
          createdAt: '2023-08-15T09:45:00Z'
        }
      ]
    }
  },
  {
    method: 'get',
    path: '/reservations/:id',
    description: 'Récupère les détails d\'une réservation spécifique.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de la réservation'
      }
    ],
    response: {
      status: 200,
      data: {
        id: 1,
        userId: 1,
        eventId: 1,
        numberOfTickets: 2,
        totalPrice: 20,
        status: 'confirmed',
        createdAt: '2023-08-10T11:20:00Z',
        paymentMethod: 'credit card',
        paymentId: 'pay_1234567'
      }
    }
  },
  {
    method: 'post',
    path: '/reservations',
    description: 'Crée une nouvelle réservation pour un événement ou une visite.',
    requestBody: {
      userId: 3,
      eventId: 2,
      numberOfTickets: 1,
      paymentMethod: 'paypal'
    },
    response: {
      status: 201,
      data: {
        id: 3,
        userId: 3,
        eventId: 2,
        numberOfTickets: 1,
        totalPrice: 10,
        status: 'pending',
        paymentMethod: 'paypal',
        createdAt: '2023-08-28T15:30:00Z'
      }
    }
  },
  {
    method: 'put',
    path: '/reservations/:id',
    description: 'Met à jour le statut ou les détails d\'une réservation.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de la réservation'
      }
    ],
    requestBody: {
      status: 'confirmed',
      paymentId: 'pay_9876543'
    },
    response: {
      status: 200,
      data: {
        id: 2,
        userId: 2,
        placeId: 1,
        visitDate: '2023-09-20T10:00:00Z',
        numberOfPersons: 3,
        totalPrice: 30,
        status: 'confirmed',
        paymentId: 'pay_9876543',
        updatedAt: '2023-08-28T16:15:00Z'
      }
    }
  },
  {
    method: 'delete',
    path: '/reservations/:id',
    description: 'Annule et supprime une réservation.',
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: 'L\'identifiant unique de la réservation'
      }
    ],
    response: {
      status: 204,
      message: 'Reservation cancelled and deleted successfully'
    }
  }
];

// Créer le générateur de documentation API
const docGenerator = new ApiDocGenerator(apiRoutes);

// Générer la documentation avec notre modèle personnalisé
function generateApiDocs() {
  // Créer le répertoire docs s'il n'existe pas
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // Générer la documentation HTML avec les informations sur les entités
  const htmlContent = generateDocTemplate(apiRoutes, API_CONFIG.entities);
  fs.writeFileSync(path.join(docsDir, 'api-documentation.html'), htmlContent);

  // Générer le fichier HTML du diagramme de classes
  const classDiagramHtml = generateClassDiagram(API_CONFIG.entities);
  fs.writeFileSync(path.join(docsDir, 'diagram_de_class.html'), classDiagramHtml);

  // Générer des formats de documentation supplémentaires si nécessaire
  docGenerator.generateDocs();

  console.log('Documentation API générée avec succès!');
  console.log(`- HTML: ${path.join(docsDir, 'api-documentation.html')}`);
  console.log(`- Diagramme de Classes: ${path.join(docsDir, 'diagram_de_class.html')}`);
  console.log(`- PDF: ${path.join(docsDir, 'api-documentation.pdf')}`);
}

// Si ce script est exécuté directement (non importé)
if (require.main === module) {
  generateApiDocs();
  console.log('Génération de la documentation API terminée!');
  console.log('\nPour voir la documentation:');
  console.log('1. Démarrez le serveur avec: npm run start');
  console.log('2. Ouvrez http://localhost:3000/docs/api-documentation.html dans votre navigateur');
  console.log('3. Cliquez sur "Diagramme de Classes" pour voir le diagramme de classes');
  console.log('\nPour tester les API directement:');
  console.log('- Utilisez l\'interface de test interactif dans la documentation');
  console.log('- Cliquez sur "Envoyer la Requête" pour tester un endpoint');
  console.log('- Copiez la commande cURL ou ouvrez dans Postman pour des tests plus avancés');
}

module.exports = { generateApiDocs };
