const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const { generateApiDocs } = require('./scripts/generateApiDocs');
const { showHelp } = require('./scripts/helpCommand');
const { API_CONFIG } = require('./config/apiConfig');
const path = require('path');

// Créer l'application Express
const app = express();
const port = API_CONFIG.port || 3000;

// Traitement des arguments de ligne de commande
const args = process.argv.slice(2);
if (args.includes('help')) {
  showHelp();
  process.exit(0);
}

// Middleware pour journaliser les appels API
app.use((req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;
  
  res.send = function(body) {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor = status >= 200 && status < 300 ? 'green' : 
                        status >= 300 && status < 400 ? 'cyan' : 
                        status >= 400 && status < 500 ? 'yellow' : 'red';
    
    console.log(
      chalk.gray(`[${new Date().toISOString()}]`) + ' ' +
      chalk.blue(req.method) + ' ' +
      chalk.white(req.path) + ' ' +
      chalk[statusColor](status) + ' ' +
      chalk.gray(`${duration}ms`)
    );
    
    return originalSend.call(this, body);
  };
  
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(chalk.red('Erreur:'), err.stack);
  res.status(500).json({
    status: 500,
    message: 'Erreur Interne du Serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Servir les fichiers statiques de documentation
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// Générer la documentation API au démarrage du serveur
try {
  generateApiDocs();
  console.log(chalk.green('✓') + ' Documentation API générée avec succès!');
} catch (error) {
  console.error(chalk.red('✗') + ' Échec de génération de la documentation API:', error);
}

/**
 * ======= ROUTES D'AUTHENTIFICATION =======
 */

/**
 * Route: POST /api/users/login
 * Description: Authentifie un utilisateur existant
 * 
 * Cette route permet à un utilisateur de se connecter en fournissant
 * son email et son mot de passe.
 * 
 * @body {String} email - L'adresse email de l'utilisateur
 * @body {String} password - Le mot de passe de l'utilisateur
 * @returns {Object} Objet contenant un status et les données de l'utilisateur
 */
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  // Logique de vérification des identifiants (simplifiée pour la démonstration)
  if (email && password) {
    res.json({
      status: 200,
      user: {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'user',
        createdAt: '2023-06-15T10:30:00Z'
      }
    });
  } else {
    res.status(401).json({
      status: 401,
      message: 'Email ou mot de passe invalide'
    });
  }
});

/**
 * Route: POST /api/users/register
 * Description: Enregistre un nouvel utilisateur
 * 
 * Cette route permet à un nouvel utilisateur de créer un compte.
 * Les données requises incluent le nom, l'email et le mot de passe.
 * 
 * @body {String} name - Le nom complet de l'utilisateur
 * @body {String} email - L'adresse email de l'utilisateur (unique)
 * @body {String} password - Le mot de passe de l'utilisateur
 * @returns {Object} Objet contenant un status et les données du nouvel utilisateur
 */
app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Vérification minimale
  if (!name || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Veuillez fournir un nom, un email et un mot de passe'
    });
  }
  
  // Logique de création de compte (simplifiée pour la démonstration)
  res.status(201).json({
    status: 201,
    user: {
      id: 3,
      name: name || 'New User',
      email: email || 'newuser@example.com',
      role: 'user',
      createdAt: new Date().toISOString()
    }
  });
});

/**
 * ======= ROUTES UTILISATEURS =======
 */

/**
 * Route: GET /api/users
 * Description: Récupère la liste de tous les utilisateurs
 * 
 * Cette route permet d'obtenir un tableau contenant tous les utilisateurs
 * enregistrés dans la base de données de JenCity avec leurs informations
 * de base comme le nom, l'email et le rôle.
 * 
 * @returns {Object} Objet contenant un status et un tableau d'utilisateurs
 */
app.get('/api/users', (req, res) => {
  // Logique pour récupérer les utilisateurs de la base de données
  res.json({
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
  });
});

/**
 * Route: GET /api/users/:id
 * Description: Récupère les détails d'un utilisateur spécifique
 * 
 * Cette route permet d'obtenir les informations détaillées d'un utilisateur
 * en fonction de son identifiant unique. Les informations retournées incluent
 * les données personnelles et la date de création du compte.
 * 
 * @param {Number} id - L'identifiant unique de l'utilisateur
 * @returns {Object} Objet contenant un status et les données détaillées de l'utilisateur
 */
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  // Logique pour récupérer un utilisateur spécifique de la base de données
  res.json({
    status: 200,
    data: {
      id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: '2023-06-15T10:30:00Z'
    }
  });
});

/**
 * Route: POST /api/users
 * Description: Crée un nouvel utilisateur
 * 
 * Cette route permet de créer un nouvel utilisateur dans la base de données
 * de JenCity. Les données requises incluent le nom, l'email et le mot de passe.
 * Un rôle par défaut 'user' est attribué aux nouveaux utilisateurs.
 * 
 * @body {String} name - Le nom complet de l'utilisateur
 * @body {String} email - L'adresse email de l'utilisateur (unique)
 * @body {String} password - Le mot de passe de l'utilisateur
 * @returns {Object} Objet contenant un status et les données du nouvel utilisateur créé
 */
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  // Logique pour créer un nouvel utilisateur dans la base de données
  res.status(201).json({
    status: 201,
    data: {
      id: 3,
      name: name || 'New User',
      email: email || 'newuser@example.com',
      role: 'user',
      createdAt: new Date().toISOString()
    }
  });
});

/**
 * Route: PUT /api/users/:id
 * Description: Mise à jour des informations d'un utilisateur existant
 * 
 * Cette route permet de modifier les informations d'un utilisateur existant
 * dans la base de données. Les champs modifiables incluent le nom et l'email.
 * 
 * @param {Number} id - L'identifiant unique de l'utilisateur
 * @body {String} [name] - Le nouveau nom de l'utilisateur (optionnel)
 * @body {String} [email] - La nouvelle adresse email de l'utilisateur (optionnel)
 * @returns {Object} Objet contenant un status et les données mises à jour de l'utilisateur
 */
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  // Logique pour mettre à jour un utilisateur dans la base de données
  res.json({
    status: 200,
    data: {
      id: userId,
      name: name || 'Updated Name',
      email: email || 'updated@example.com',
      role: 'user',
      updatedAt: new Date().toISOString()
    }
  });
});

/**
 * Route: DELETE /api/users/:id
 * Description: Supprime un utilisateur
 * 
 * Cette route permet de supprimer définitivement un utilisateur de la base de
 * données de JenCity en fonction de son identifiant unique.
 * 
 * @param {Number} id - L'identifiant unique de l'utilisateur
 * @returns {Object} Objet contenant un status et un message de confirmation
 */
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  // Logique pour supprimer un utilisateur de la base de données
  res.status(204).json({
    status: 204,
    message: 'User deleted successfully'
  });
});

/**
 * ======= ROUTES LIEUX =======
 */

/**
 * Route: GET /api/places
 * Description: Récupère la liste de tous les lieux
 * 
 * Cette route permet d'obtenir un tableau contenant tous les lieux
 * touristiques disponibles dans JenCity, incluant leur nom, type,
 * emplacement géographique et une brève description.
 * 
 * @returns {Object} Objet contenant un status et un tableau de lieux
 */
app.get('/api/places', (req, res) => {
  // Logique pour récupérer les lieux de la base de données
  res.json({
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
  });
});

/**
 * Route: GET /api/places/:id
 * Description: Récupère les détails d'un lieu spécifique
 * 
 * Cette route permet d'obtenir des informations détaillées sur un lieu
 * touristique spécifique, incluant les images, horaires d'ouverture,
 * tarifs d'entrée et autres informations pratiques.
 * 
 * @param {Number} id - L'identifiant unique du lieu
 * @returns {Object} Objet contenant un status et les données détaillées du lieu
 */
app.get('/api/places/:id', (req, res) => {
  const placeId = parseInt(req.params.id);
  // Logique pour récupérer un lieu spécifique de la base de données
  res.json({
    status: 200,
    data: {
      id: placeId,
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
  });
});

/**
 * Route: POST /api/places
 * Description: Crée un nouveau lieu
 * 
 * Cette route permet d'ajouter un nouveau lieu touristique dans la base de
 * données de JenCity. Les informations requises incluent le nom, le type,
 * l'emplacement géographique et une description.
 * 
 * @body {String} name - Le nom du lieu
 * @body {String} type - Le type de lieu (historical, natural, cultural, etc.)
 * @body {Object} location - Les coordonnées géographiques du lieu
 * @body {Number} location.latitude - La latitude
 * @body {Number} location.longitude - La longitude
 * @body {String} description - Une description du lieu
 * @returns {Object} Objet contenant un status et les données du nouveau lieu créé
 */
app.post('/api/places', (req, res) => {
  const { name, type, location, description } = req.body;
  // Logique pour créer un nouveau lieu dans la base de données
  res.status(201).json({
    status: 201,
    data: {
      id: 3,
      name: name || 'New Place',
      type: type || 'cultural',
      location: location || {
        latitude: 36.5,
        longitude: 8.8
      },
      description: description || 'A new cultural attraction',
      createdAt: new Date().toISOString()
    }
  });
});

/**
 * Route: PUT /api/places/:id
 * Description: Met à jour un lieu existant
 * 
 * Cette route permet de modifier les informations d'un lieu touristique existant
 * dans la base de données. Les champs modifiables incluent le nom, le type et la description.
 * 
 * @param {Number} id - L'identifiant unique du lieu
 * @body {String} [name] - Le nouveau nom du lieu (optionnel)
 * @body {String} [type] - Le nouveau type du lieu (optionnel)
 * @body {String} [description] - La nouvelle description du lieu (optionnel)
 * @returns {Object} Objet contenant un status et les données mises à jour du lieu
 */
app.put('/api/places/:id', (req, res) => {
  const placeId = parseInt(req.params.id);
  const { name, type, description } = req.body;
  
  res.json({
    status: 200,
    data: {
      id: placeId,
      name: name || 'Updated Place',
      type: type || 'historical',
      location: {
        latitude: 36.5594,
        longitude: 8.7553
      },
      description: description || 'Updated description for this attraction',
      updatedAt: new Date().toISOString()
    }
  });
});

/**
 * Route: DELETE /api/places/:id
 * Description: Supprime un lieu
 * 
 * Cette route permet de supprimer définitivement un lieu touristique de la base de
 * données de JenCity en fonction de son identifiant unique.
 * 
 * @param {Number} id - L'identifiant unique du lieu
 * @returns {Object} Objet contenant un status et un message de confirmation
 */
app.delete('/api/places/:id', (req, res) => {
  const placeId = parseInt(req.params.id);
  
  res.status(204).json({
    status: 204,
    message: 'Place deleted successfully'
  });
});

/**
 * ======= ROUTES ÉVÉNEMENTS =======
 */

/**
 * Route: GET /api/events
 * Description: Récupère la liste de tous les événements
 * 
 * Cette route permet d'obtenir un tableau contenant tous les événements
 * programmés dans JenCity, incluant leur titre, description, dates
 * de début et fin, ainsi que leur emplacement.
 * 
 * @returns {Object} Objet contenant un status et un tableau d'événements
 */
app.get('/api/events', (req, res) => {
  // Logique pour récupérer les événements de la base de données
  res.json({
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
  });
});

/**
 * Route: GET /api/events/:id
 * Description: Récupère les détails d'un événement spécifique
 * 
 * Cette route permet d'obtenir des informations détaillées sur un événement
 * spécifique, incluant l'organisateur, le prix des billets, la capacité et les images.
 * 
 * @param {Number} id - L'identifiant unique de l'événement
 * @returns {Object} Objet contenant un status et les données détaillées de l'événement
 */
app.get('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  
  res.json({
    status: 200,
    data: {
      id: eventId,
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
  });
});

/**
 * Route: POST /api/events
 * Description: Crée un nouvel événement
 * 
 * Cette route permet d'ajouter un nouvel événement dans la base de données de JenCity.
 * Les informations requises incluent le titre, la description, les dates et l'emplacement.
 * 
 * @body {String} title - Le titre de l'événement
 * @body {String} description - La description de l'événement
 * @body {String} startDate - La date et heure de début (format ISO)
 * @body {String} endDate - La date et heure de fin (format ISO)
 * @body {String} location - L'emplacement de l'événement
 * @returns {Object} Objet contenant un status et les données du nouvel événement créé
 */
app.post('/api/events', (req, res) => {
  const { title, description, startDate, endDate, location } = req.body;
  
  res.status(201).json({
    status: 201,
    data: {
      id: 3,
      title: title || 'New Event',
      description: description || 'Description of the new event',
      startDate: startDate || '2023-11-10T19:00:00Z',
      endDate: endDate || '2023-11-10T23:00:00Z',
      location: location || 'Bulla Regia Site',
      createdAt: new Date().toISOString()
    }
  });
});

/**
 * Route: PUT /api/events/:id
 * Description: Met à jour un événement existant
 * 
 * Cette route permet de modifier les informations d'un événement existant dans
 * la base de données. Les champs modifiables incluent le titre, la description et l'emplacement.
 * 
 * @param {Number} id - L'identifiant unique de l'événement
 * @body {String} [title] - Le nouveau titre de l'événement (optionnel)
 * @body {String} [description] - La nouvelle description de l'événement (optionnel)
 * @body {String} [location] - Le nouvel emplacement de l'événement (optionnel)
 * @returns {Object} Objet contenant un status et les données mises à jour de l'événement
 */
app.put('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const { title, description, location } = req.body;
  
  res.json({
    status: 200,
    data: {
      id: eventId,
      title: title || 'Updated Event Title',
      description: description || 'Updated event description',
      startDate: '2023-09-15T18:00:00Z',
      endDate: '2023-09-17T22:00:00Z',
      location: location || 'New location',
      updatedAt: new Date().toISOString()
    }
  });
});

/**
 * Route: DELETE /api/events/:id
 * Description: Supprime un événement
 * 
 * Cette route permet de supprimer définitivement un événement de la base de
 * données de JenCity en fonction de son identifiant unique.
 * 
 * @param {Number} id - L'identifiant unique de l'événement
 * @returns {Object} Objet contenant un status et un message de confirmation
 */
app.delete('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  
  res.status(204).json({
    status: 204,
    message: 'Event deleted successfully'
  });
});

/**
 * ======= ROUTES SESSIONS =======
 */

/**
 * Route: GET /api/sessions
 * Description: Récupère la liste des sessions de messages d'un utilisateur
 * 
 * Cette route permet d'obtenir un tableau contenant toutes les sessions
 * de messages d'un utilisateur, incluant les informations sur l'autre 
 * utilisateur et le dernier message échangé.
 * 
 * @returns {Object} Objet contenant un status et un tableau de sessions
 */
app.get('/api/sessions', (req, res) => {
  // Logique pour récupérer les sessions de la base de données
  res.json({
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
  });
});

/**
 * Route: GET /api/sessions/:id
 * Description: Récupère les détails d'une session de messages spécifique
 * 
 * Cette route permet d'obtenir des informations détaillées sur une session
 * spécifique, incluant les utilisateurs impliqués et l'historique des messages.
 * 
 * @param {Number} id - L'identifiant unique de la session
 * @returns {Object} Objet contenant un status et les données détaillées de la session
 */
app.get('/api/sessions/:id', (req, res) => {
  const sessionId = parseInt(req.params.id);
  
  res.json({
    status: 200,
    data: {
      id: sessionId,
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
          sessionId: sessionId,
          senderId: 1,
          content: 'Bonjour, j\'ai une question sur Bulla Regia.',
          createdAt: '2023-08-15T14:30:00Z',
          read: true
        },
        {
          id: 2,
          sessionId: sessionId,
          senderId: 2,
          content: 'Bien sûr, comment puis-je vous aider?',
          createdAt: '2023-08-15T14:35:00Z',
          read: false
        }
      ]
    }
  });
});

/**
 * Route: POST /api/sessions
 * Description: Crée une nouvelle session de messages
 * 
 * Cette route permet de créer une nouvelle session de messages entre
 * deux utilisateurs dans la base de données.
 * 
 * @body {Number} userId1 - L'identifiant du premier utilisateur
 * @body {Number} userId2 - L'identifiant du deuxième utilisateur
 * @returns {Object} Objet contenant un status et les données de la nouvelle session créée
 */
app.post('/api/sessions', (req, res) => {
  const { userId1, userId2 } = req.body;
  
  res.status(201).json({
    status: 201,
    data: {
      id: 3,
      userId1: userId1 || 1,
      userId2: userId2 || 3,
      lastMessageAt: null,
      isActive: true,
      createdAt: new Date().toISOString()
    }
  });
});

/**
 * Route: PUT /api/sessions/:id
 * Description: Met à jour une session de messages
 * 
 * Cette route permet de modifier le statut d'une session de messages existante.
 * 
 * @param {Number} id - L'identifiant unique de la session
 * @body {Boolean} [isActive] - Le nouvel état d'activation de la session (optionnel)
 * @returns {Object} Objet contenant un status et les données mises à jour de la session
 */
app.put('/api/sessions/:id', (req, res) => {
  const sessionId = parseInt(req.params.id);
  const { isActive } = req.body;
  
  res.json({
    status: 200,
    data: {
      id: sessionId,
      userId1: 1,
      userId2: 2,
      lastMessageAt: '2023-08-15T14:35:00Z',
      isActive: isActive !== undefined ? isActive : false,
      updatedAt: new Date().toISOString()
    }
  });
});

/**
 * Route: DELETE /api/sessions/:id
 * Description: Supprime une session de messages
 * 
 * Cette route permet de supprimer définitivement une session de messages
 * de la base de données en fonction de son identifiant unique.
 * 
 * @param {Number} id - L'identifiant unique de la session
 * @returns {Object} Objet contenant un status et un message de confirmation
 */
app.delete('/api/sessions/:id', (req, res) => {
  const sessionId = parseInt(req.params.id);
  
  res.status(204).json({
    status: 204,
    message: 'Session deleted successfully'
  });
});

/**
 * ======= ROUTES MESSAGES =======
 */

/**
 * Route: GET /api/messages
 * Description: Récupère la liste de tous les messages
 * 
 * Cette route permet d'obtenir un tableau contenant tous les messages
 * échangés entre les utilisateurs de JenCity, incluant l'expéditeur,
 * le destinataire, le contenu et l'état de lecture.
 * 
 * @returns {Object} Objet contenant un status et un tableau de messages
 */
app.get('/api/messages', (req, res) => {
  res.json({
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
  });
});

/**
 * Route: GET /api/messages/:id
 * Description: Récupère un message spécifique
 * 
 * Cette route permet d'obtenir les détails d'un message spécifique
 * en fonction de son identifiant unique.
 * 
 * @param {Number} id - L'identifiant unique du message
 * @returns {Object} Objet contenant un status et les données du message
 */
app.get('/api/messages/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  
  res.json({
    status: 200,
    data: {
      id: messageId,
      sessionId: 1,
      senderId: 1,
      content: 'Bonjour, j\'ai une question sur Bulla Regia.',
      createdAt: '2023-08-15T14:30:00Z',
      read: true
    }
  });
});

/**
 * Route: POST /api/messages
 * Description: Envoie un nouveau message
 * 
 * Cette route permet d'envoyer un nouveau message dans une session existante.
 * Les données requises incluent l'identifiant de la session, l'expéditeur,
 * et le contenu du message.
 * 
 * @body {Number} sessionId - L'identifiant de la session
 * @body {Number} senderId - L'identifiant de l'expéditeur
 * @body {String} content - Le contenu du message
 * @returns {Object} Objet contenant un status et les données du message envoyé
 */
app.post('/api/messages', (req, res) => {
  const { sessionId, senderId, content } = req.body;
  
  res.status(201).json({
    status: 201,
    data: {
      id: 3,
      sessionId: sessionId || 1,
      senderId: senderId || 1,
      content: content || 'Je voudrais plus d\'informations sur l\'événement du 15 septembre.',
      createdAt: new Date().toISOString(),
      read: false
    }
  });
});

/**
 * Route: PUT /api/messages/:id
 * Description: Met à jour l'état de lecture d'un message
 * 
 * Cette route permet de modifier l'état de lecture d'un message existant,
 * par exemple pour marquer un message comme lu.
 *
