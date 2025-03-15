
// Configuration de l'API
const API_PORT = process.env.API_PORT || 3000;
const API_HOST = process.env.API_HOST || 'localhost';

// Créer l'URL de base de l'API
const API_URL = `http://${API_HOST}:${API_PORT}/api`; 

// Configuration étendue pour la documentation et autres
const API_CONFIG = {
  host: API_HOST,
  port: API_PORT,
  baseUrl: `/api`,
  version: '1.0',
  // Paramètres spécifiques à l'environnement
  isProduction: process.env.NODE_ENV === 'production',
  cors: {
    enabled: true,
    origins: ['http://localhost:8080', 'https://jendoubalife.com']
  },
  // Entités de base de données pour la documentation
  entities: [
    {
      name: 'User',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string', isPrivate: true },
        { name: 'role', type: 'string' },
        { name: 'createdAt', type: 'date' },
        { name: 'updatedAt', type: 'date' }
      ],
      relations: [
        { type: 'hasMany', entity: 'Review', via: 'userId' },
        { type: 'hasMany', entity: 'Message', via: 'senderId' },
        { type: 'hasMany', entity: 'Message', via: 'receiverId' },
        { type: 'hasMany', entity: 'Reservation', via: 'userId' },
        { type: 'hasMany', entity: 'Session', via: 'userId1' },
        { type: 'hasMany', entity: 'Session', via: 'userId2' }
      ]
    },
    {
      name: 'Place',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'location', type: 'object', fields: ['latitude', 'longitude'] },
        { name: 'images', type: 'array' },
        { name: 'openingHours', type: 'object' },
        { name: 'entranceFee', type: 'object' },
        { name: 'createdAt', type: 'date' },
        { name: 'updatedAt', type: 'date' }
      ],
      relations: [
        { type: 'hasMany', entity: 'Review', via: 'placeId' },
        { type: 'hasMany', entity: 'Reservation', via: 'placeId' }
      ]
    },
    {
      name: 'Event',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'location', type: 'string' },
        { name: 'organizer', type: 'string' },
        { name: 'ticketPrice', type: 'number' },
        { name: 'capacity', type: 'number' },
        { name: 'images', type: 'array' },
        { name: 'createdAt', type: 'date' },
        { name: 'updatedAt', type: 'date' }
      ],
      relations: [
        { type: 'hasMany', entity: 'Reservation', via: 'eventId' }
      ]
    },
    {
      name: 'Message',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'sessionId', type: 'number', reference: 'Session.id' },
        { name: 'senderId', type: 'number', reference: 'User.id' },
        { name: 'content', type: 'text' },
        { name: 'read', type: 'boolean' },
        { name: 'createdAt', type: 'date' },
        { name: 'updatedAt', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'User', via: 'senderId' },
        { type: 'belongsTo', entity: 'Session', via: 'sessionId' }
      ]
    },
    {
      name: 'Session',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'userId1', type: 'number', reference: 'User.id' },
        { name: 'userId2', type: 'number', reference: 'User.id' },
        { name: 'lastMessageAt', type: 'date' },
        { name: 'isActive', type: 'boolean' },
        { name: 'createdAt', type: 'date' },
        { name: 'updatedAt', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'User', via: 'userId1' },
        { type: 'belongsTo', entity: 'User', via: 'userId2' },
        { type: 'hasMany', entity: 'Message', via: 'sessionId' }
      ]
    },
    {
      name: 'Review',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'userId', type: 'number', reference: 'User.id' },
        { name: 'placeId', type: 'number', reference: 'Place.id' },
        { name: 'rating', type: 'number' },
        { name: 'comment', type: 'text' },
        { name: 'createdAt', type: 'date' },
        { name: 'updatedAt', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'User', via: 'userId' },
        { type: 'belongsTo', entity: 'Place', via: 'placeId' }
      ]
    },
    {
      name: 'Reservation',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'userId', type: 'number', reference: 'User.id' },
        { name: 'eventId', type: 'number', reference: 'Event.id', isOptional: true },
        { name: 'placeId', type: 'number', reference: 'Place.id', isOptional: true },
        { name: 'numberOfTickets', type: 'number' },
        { name: 'numberOfPersons', type: 'number' },
        { name: 'totalPrice', type: 'number' },
        { name: 'status', type: 'string' },
        { name: 'paymentMethod', type: 'string' },
        { name: 'paymentId', type: 'string' },
        { name: 'visitDate', type: 'date' },
        { name: 'createdAt', type: 'date' },
        { name: 'updatedAt', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'User', via: 'userId' },
        { type: 'belongsTo', entity: 'Event', via: 'eventId' },
        { type: 'belongsTo', entity: 'Place', via: 'placeId' }
      ]
    }
  ]
};

// Pour Expo Go sur des appareils physiques, vous pourriez avoir besoin d'utiliser l'IP locale de votre machine
// const API_URL = 'http://192.168.1.100:3000/api';

// Pour la documentation
console.log(`API initialisée avec l'URL: ${API_URL}`);

module.exports = {
  API_URL,
  API_CONFIG
};
