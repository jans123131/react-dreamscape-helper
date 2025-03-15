
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
        { name: 'user_id', type: 'number', isPrimary: true },
        { name: 'nom', type: 'string' },
        { name: 'prenom', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password_hash', type: 'string', isPrivate: true },
        { name: 'role', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'profile_image', type: 'string', isOptional: true },
        { name: 'phone', type: 'string', isOptional: true },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
      ],
      relations: [
        { type: 'hasMany', entity: 'Review', via: 'user_id' },
        { type: 'hasMany', entity: 'Messagerie', via: 'id_expediteur' },
        { type: 'hasMany', entity: 'Messagerie', via: 'id_destinataire' },
        { type: 'hasMany', entity: 'Reservation', via: 'user_id' }
      ]
    },
    {
      name: 'Place',
      fields: [
        { name: 'place_id', type: 'number', isPrimary: true },
        { name: 'nom_place', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'location', type: 'string' },
        { name: 'longitude', type: 'number' },
        { name: 'latitude', type: 'number' },
        { name: 'url_img', type: 'string', isOptional: true },
        { name: 'url_web', type: 'string', isOptional: true },
        { name: 'category', type: 'string' },
        { name: 'provider_id', type: 'number', isOptional: true },
        { name: 'average_rating', type: 'number' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
      ],
      relations: [
        { type: 'hasMany', entity: 'Review', via: 'place_id' },
        { type: 'hasMany', entity: 'Reservation', via: 'place_id' },
        { type: 'belongsTo', entity: 'User', via: 'provider_id' }
      ]
    },
    {
      name: 'Event',
      fields: [
        { name: 'event_id', type: 'number', isPrimary: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'place_id', type: 'number', isOptional: true },
        { name: 'start_date', type: 'date' },
        { name: 'end_date', type: 'date' },
        { name: 'image_url', type: 'string', isOptional: true },
        { name: 'price', type: 'number', isOptional: true },
        { name: 'status', type: 'string' },
        { name: 'created_by', type: 'number' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
      ],
      relations: [
        { type: 'hasMany', entity: 'Reservation', via: 'event_id' },
        { type: 'belongsTo', entity: 'Place', via: 'place_id' },
        { type: 'belongsTo', entity: 'User', via: 'created_by' }
      ]
    },
    {
      name: 'Messagerie',
      fields: [
        { name: 'id', type: 'number', isPrimary: true },
        { name: 'id_expediteur', type: 'number' },
        { name: 'id_destinataire', type: 'number' },
        { name: 'texte', type: 'text' },
        { name: 'date_envoye', type: 'date' },
        { name: 'is_read', type: 'boolean' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'User', via: 'id_expediteur' },
        { type: 'belongsTo', entity: 'User', via: 'id_destinataire' }
      ]
    },
    {
      name: 'Review',
      fields: [
        { name: 'review_id', type: 'number', isPrimary: true },
        { name: 'place_id', type: 'number' },
        { name: 'user_id', type: 'number' },
        { name: 'rating', type: 'number' },
        { name: 'comment', type: 'text' },
        { name: 'status', type: 'string' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'User', via: 'user_id' },
        { type: 'belongsTo', entity: 'Place', via: 'place_id' }
      ]
    },
    {
      name: 'Reservation',
      fields: [
        { name: 'reservation_id', type: 'number', isPrimary: true },
        { name: 'user_id', type: 'number' },
        { name: 'place_id', type: 'number' },
        { name: 'event_id', type: 'number', isOptional: true },
        { name: 'reservation_date', type: 'date' },
        { name: 'start_time', type: 'time' },
        { name: 'end_time', type: 'time', isOptional: true },
        { name: 'num_guests', type: 'number' },
        { name: 'status', type: 'string' },
        { name: 'notes', type: 'text', isOptional: true },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'User', via: 'user_id' },
        { type: 'belongsTo', entity: 'Event', via: 'event_id' },
        { type: 'belongsTo', entity: 'Place', via: 'place_id' }
      ]
    },
    {
      name: 'Promotion',
      fields: [
        { name: 'promotion_id', type: 'number', isPrimary: true },
        { name: 'place_id', type: 'number' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'discount_percent', type: 'number' },
        { name: 'start_date', type: 'date' },
        { name: 'end_date', type: 'date' },
        { name: 'created_by', type: 'number' },
        { name: 'created_at', type: 'date' },
        { name: 'updated_at', type: 'date' }
      ],
      relations: [
        { type: 'belongsTo', entity: 'Place', via: 'place_id' },
        { type: 'belongsTo', entity: 'User', via: 'created_by' }
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
