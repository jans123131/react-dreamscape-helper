
/**
 * Script pour initialiser des données sample dans la base de données
 * Ce script peut être exécuté pour créer des tables et des données de test
 */

const chalk = require('chalk');

console.log(chalk.cyan('Initialisation des données de démonstration...'));
console.log(chalk.yellow('Note: Dans une application réelle, ce script créerait des tables dans une base de données.'));

// Simuler la création de tables
const tables = [
  'users',
  'places',
  'events',
  'sessions',
  'messages',
  'reviews',
  'reservations'
];

// Afficher la progression de création de tables
tables.forEach(table => {
  console.log(chalk.green(`✓ Table ${chalk.bold(table)} créée avec succès`));
});

// Simuler l'insertion de données sample
console.log('\nInsertion de données sample:');

// Utilisateurs
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
  { id: 3, name: 'Ahmed Bouzid', email: 'ahmed@example.com', role: 'user' },
  { id: 4, name: 'Fatima Zouari', email: 'fatima@example.com', role: 'provider' }
];

// Lieux
const places = [
  { id: 1, name: 'Bulla Regia', type: 'historical' },
  { id: 2, name: 'Ain Draham', type: 'natural' },
  { id: 3, name: 'Tabarka Beach', type: 'natural' }
];

// Événements
const events = [
  { id: 1, title: 'Festival Culturel de Jendouba', location: 'Jendouba City Center' },
  { id: 2, title: 'Randonnée à Ain Draham', location: 'Ain Draham' }
];

// Sessions
const sessions = [
  { id: 1, userId1: 1, userId2: 2, isActive: true },
  { id: 2, userId1: 1, userId2: 3, isActive: true },
  { id: 3, userId1: 2, userId2: 4, isActive: true }
];

// Messages
const messages = [
  { id: 1, sessionId: 1, senderId: 1, content: 'Bonjour, j\'ai une question sur Bulla Regia.', read: true },
  { id: 2, sessionId: 1, senderId: 2, content: 'Bien sûr, comment puis-je vous aider?', read: false },
  { id: 3, sessionId: 2, senderId: 1, content: 'Bonjour, quels sont les évènements à venir?', read: true },
  { id: 4, sessionId: 2, senderId: 3, content: 'Il y a un festival la semaine prochaine.', read: false },
  { id: 5, sessionId: 3, senderId: 2, content: 'Avez-vous des chambres disponibles?', read: true },
  { id: 6, sessionId: 3, senderId: 4, content: 'Oui, nous avons plusieurs options.', read: false }
];

// Avis
const reviews = [
  { id: 1, userId: 1, placeId: 1, rating: 5, comment: 'Un site historique fascinant!' },
  { id: 2, userId: 2, placeId: 2, rating: 4, comment: 'Très beau paysage.' }
];

// Réservations
const reservations = [
  { id: 1, userId: 1, eventId: 1, status: 'confirmed' },
  { id: 2, userId: 2, placeId: 1, status: 'pending' }
];

// Afficher les données insérées
console.log(chalk.green(`✓ ${users.length} utilisateurs insérés`));
console.log(chalk.green(`✓ ${places.length} lieux insérés`));
console.log(chalk.green(`✓ ${events.length} événements insérés`));
console.log(chalk.green(`✓ ${sessions.length} sessions insérées`));
console.log(chalk.green(`✓ ${messages.length} messages insérés`));
console.log(chalk.green(`✓ ${reviews.length} avis insérés`));
console.log(chalk.green(`✓ ${reservations.length} réservations insérées`));

console.log('\n' + chalk.magenta('Initialisation terminée avec succès!'));
console.log(chalk.cyan('Vous pouvez maintenant utiliser l\'API avec ces données de démonstration.'));
console.log(chalk.yellow('Dans une application réelle, vous utiliseriez une base de données comme MongoDB, MySQL ou PostgreSQL.'));

console.log('\n' + chalk.white('Pour tester l\'envoi d\'un message et la création automatique de session:'));
console.log(chalk.white('1. Envoyez une requête POST à /api/messages avec:'));
console.log(chalk.grey('   {'));
console.log(chalk.grey('     "senderId": 1,'));
console.log(chalk.grey('     "receiverId": 4,'));
console.log(chalk.grey('     "content": "Bonjour, je suis intéressé par votre hébergement"'));
console.log(chalk.grey('   }'));
console.log(chalk.white('2. Une nouvelle session sera automatiquement créée entre les utilisateurs 1 et 4 si elle n\'existe pas.'));
