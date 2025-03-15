
/**
 * Script pour initialiser des données sample dans la base de données
 * Ce script peut être exécuté pour créer des tables et des données de test
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// SQL Schema to be saved to file
const sqlSchema = `
-- Create database if not exists with proper character set
CREATE DATABASE IF NOT EXISTS myapp_database1 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
USE myapp_database1;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL COMMENT 'Store hashed password ',
    role ENUM('admin', 'user', 'provider') NOT NULL DEFAULT 'user',
    status ENUM('active', 'inactive', 'banned') NOT NULL DEFAULT 'active',
    profile_image VARCHAR(255),
    phone VARCHAR(20),
    oauth_id VARCHAR(255),
    oauth_provider VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email(191)),
    INDEX idx_role (role)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Places Table
CREATE TABLE IF NOT EXISTS places (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_place VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) COMMENT 'Human-readable address',
    longitude DECIMAL(9,6) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    url_img VARCHAR(512) COMMENT 'URL to image',
    url_web VARCHAR(512) COMMENT 'Website URL',
    category ENUM('museums', 'hotels', 'restaurants', 'historical', 'attractions') NOT NULL DEFAULT 'museums',
    provider_id INT COMMENT 'If place is managed by a provider',
    average_rating DECIMAL(3,2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_location (location(191)),
    INDEX idx_coordinates (latitude, longitude),
    INDEX idx_category (category),
    FOREIGN KEY (provider_id) REFERENCES users(user_id) ON DELETE SET NULL
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    place_id INT NOT NULL,
    user_id INT NOT NULL,
    rating DECIMAL(3,2) NOT NULL COMMENT 'Rating from 0 to 5',
    comment TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_place_id (place_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    place_id INT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    image_url VARCHAR(512),
    price DECIMAL(10,2),
    status ENUM('upcoming', 'ongoing', 'past', 'cancelled') DEFAULT 'upcoming',
    created_by INT NOT NULL COMMENT 'Admin or provider who created',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_dates (start_date, end_date),
    INDEX idx_status (status)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    place_id INT NOT NULL,
    event_id INT,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    num_guests INT DEFAULT 1,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_place_id (place_id),
    INDEX idx_date (reservation_date),
    INDEX idx_status (status)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Promotions Table
CREATE TABLE IF NOT EXISTS promotions (
    promotion_id INT AUTO_INCREMENT PRIMARY KEY,
    place_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percent DECIMAL(5,2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Messagerie Table (New)
CREATE TABLE IF NOT EXISTS messagerie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_expediteur INT NOT NULL,
    id_destinataire INT NOT NULL,
    texte TEXT NOT NULL,
    date_envoye TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_expediteur) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (id_destinataire) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_expediteur (id_expediteur),
    INDEX idx_destinataire (id_destinataire),
    INDEX idx_conversation (id_expediteur, id_destinataire)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Individual triggers for rating update
CREATE TRIGGER update_place_rating_insert AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE places SET average_rating = (
        SELECT AVG(rating) FROM reviews 
        WHERE place_id = NEW.place_id AND status = 'approved'
    ) WHERE place_id = NEW.place_id;
END;

CREATE TRIGGER update_place_rating_update AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    UPDATE places SET average_rating = (
        SELECT AVG(rating) FROM reviews 
        WHERE place_id = NEW.place_id AND status = 'approved'
    ) WHERE place_id = NEW.place_id;
END;

CREATE TRIGGER update_place_rating_delete AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    UPDATE places SET average_rating = (
        SELECT AVG(rating) FROM reviews 
        WHERE place_id = OLD.place_id AND status = 'approved'
    ) WHERE place_id = OLD.place_id;
END;

-- Insert sample users (password: 123123)
-- The password hash below is for "123123" using bcrypt
INSERT INTO users (nom, prenom, email, password_hash, role, status) VALUES
('Admin', 'User', 'admin@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'admin', 'active'),
('Regular', 'User', 'user@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'user', 'active'),
('Hotel', 'Owner', 'hotel@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'provider', 'active'),
('Restaurant', 'Manager', 'restaurant@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'provider', 'active'),
('Premium', 'Member', 'premium@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'premium', 'active'),
('John', 'Doe', 'john@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'user', 'active'),
('Jane', 'Smith', 'jane@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'user', 'active'),
('Sarah', 'Connor', 'sarah@example.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'premium', 'active'),
('Tunisian', 'Guide', 'guide@jendouba.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'provider', 'active'),
('Local', 'Explorer', 'explorer@jendouba.com', '$2a$10$JNe8AhPXkcLfQAOLJAQYpemUPLOLJrr0Fot1IQUcTTiQmWGn9aJQ2', 'premium', 'active');

-- Insert sample places
INSERT INTO places (nom_place, description, location, longitude, latitude, category, provider_id, url_img) VALUES
('Louvre Museum', 'World-famous art museum in Paris', 'Rue de Rivoli, 75001 Paris, France', 2.3376, 48.8606, 'museums', 1, 'https://images.unsplash.com/photo-1544113151-22f92a5ac50c'),
('Ritz Hotel', 'Luxury hotel in the heart of Paris', '15 Place Vendôme, 75001 Paris, France', 2.3276, 48.8679, 'hotels', 3, 'https://images.unsplash.com/photo-1566073771259-6a8506099945'),
('Le Meurice Restaurant', 'Fine dining restaurant with Michelin stars', '228 Rue de Rivoli, 75001 Paris, France', 2.3289, 48.8651, 'restaurants', 4, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'),
('Eiffel Tower', 'Iconic iron tower with observation decks', 'Champ de Mars, 75007 Paris, France', 2.2945, 48.8584, 'attractions', 1, 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e'),
('Arc de Triomphe', 'Historic monument at the center of Place Charles de Gaulle', 'Place Charles de Gaulle, 75008 Paris, France', 2.2950, 48.8738, 'historical', 1, 'https://images.unsplash.com/photo-1597666619076-719209963fd3'),
-- Adding Jendouba, Tunisia famous places
('Bulla Regia', 'Ancient Roman city with unique underground villas and well-preserved mosaics', 'Jendouba Governorate, Tunisia', 8.7550, 36.5594, 'historical', 9, 'https://images.unsplash.com/photo-1555774898-8425b77ee4e8'),
('Chemtou', 'Ancient Roman site renowned for its yellow marble quarries and archaeological remains', 'Chemtou, Jendouba Governorate, Tunisia', 8.5700, 36.4900, 'historical', 9, 'https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf'),
('Ain Draham', 'Picturesque mountain town surrounded by cork oak forests famous for its cooler climate', 'Ain Draham, Jendouba Governorate, Tunisia', 8.6870, 36.7800, 'attractions', 9, 'https://images.unsplash.com/photo-1520862594179-ee7003eecc6d'),
('Tabarka', 'Coastal city known for its Genoese Fort, coral reefs, and annual jazz festival', 'Tabarka, Jendouba Governorate, Tunisia', 8.7577, 36.9547, 'attractions', 9, 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6463'),
('Feija National Park', 'Protected nature reserve home to diverse flora and fauna including the endangered Barbary deer', 'Ain Draham, Jendouba Governorate, Tunisia', 8.5138, 36.4932, 'attractions', 9, 'https://images.unsplash.com/photo-1553530979-fbb9e4aee36f');
`;

// Save the SQL schema to a file for reference
const schemaFilePath = path.join(process.cwd(), 'database_schema.sql');
fs.writeFileSync(schemaFilePath, sqlSchema, 'utf8');

console.log(chalk.cyan('Initialisation des données de démonstration...'));
console.log(chalk.yellow('Note: Ce script simule seulement la création de tables. Dans une application réelle, vous devriez exécuter le script SQL.'));

// ASCII art for JENCITY
console.log(chalk.magenta('     ██╗███████╗███╗   ██╗ ██████╗██╗████████╗██╗   ██╗'));
console.log(chalk.magenta('     ██║██╔════╝████╗  ██║██╔════╝██║╚══██╔══╝╚██╗ ██╔╝'));
console.log(chalk.magenta('     ██║█████╗  ██╔██╗ ██║██║     ██║   ██║    ╚████╔╝ '));
console.log(chalk.magenta('██   ██║██╔══╝  ██║╚██╗██║██║     ██║   ██║     ╚██╔╝  '));
console.log(chalk.magenta('╚█████╔╝███████╗██║ ╚████║╚██████╗██║   ██║      ██║   '));
console.log(chalk.magenta(' ╚════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝   ╚═╝      ╚═╝   \n'));

// Simuler la création de tables
const tables = [
  'users',
  'places',
  'events',
  'messagerie',
  'reviews', 
  'reservations',
  'promotions'
];

// Afficher la progression de création de tables
tables.forEach(table => {
  console.log(chalk.green(`✓ Table ${chalk.bold(table)} créée avec succès (simulation)`));
});

console.log(chalk.green('\n✓ Schema SQL sauvegardé dans le fichier: database_schema.sql'));

// Utilisateurs
const users = [
  { id: 1, nom: 'Admin', prenom: 'User', email: 'admin@example.com', role: 'admin' },
  { id: 2, nom: 'Regular', prenom: 'User', email: 'user@example.com', role: 'user' },
  { id: 3, nom: 'Hotel', prenom: 'Owner', email: 'hotel@example.com', role: 'provider' },
  { id: 4, nom: 'Restaurant', prenom: 'Manager', email: 'restaurant@example.com', role: 'provider' },
  { id: 9, nom: 'Tunisian', prenom: 'Guide', email: 'guide@jendouba.com', role: 'provider' },
  { id: 10, nom: 'Local', prenom: 'Explorer', email: 'explorer@jendouba.com', role: 'premium' }
];

// Lieux
const places = [
  { id: 1, nom_place: 'Louvre Museum', category: 'museums' },
  { id: 6, nom_place: 'Bulla Regia', category: 'historical' },
  { id: 8, nom_place: 'Ain Draham', category: 'attractions' },
  { id: 9, nom_place: 'Tabarka', category: 'attractions' }
];

// Événements
const events = [
  { id: 1, title: 'Special Exhibition: Renaissance Masters', location: 'Louvre Museum' },
  { id: 5, title: 'Bulla Regia Archaeological Tour', location: 'Bulla Regia' },
  { id: 6, title: 'Tabarka Jazz Festival', location: 'Tabarka' }
];

// Messages
const messages = [
  { id: 1, id_expediteur: 2, id_destinataire: 5, texte: 'Bonjour, j\'ai une question sur Bulla Regia.', is_read: true },
  { id: 2, id_expediteur: 5, id_destinataire: 2, texte: 'Bien sûr, comment puis-je vous aider?', is_read: false },
  { id: 11, id_expediteur: 9, id_destinataire: 10, texte: 'Hello! I\'m organizing a tour to Bulla Regia next week. Would you be interested?', is_read: true },
  { id: 12, id_expediteur: 10, id_destinataire: 9, texte: 'That sounds great! How much would it cost per person?', is_read: true }
];

// Avis
const reviews = [
  { id: 1, user_id: 2, place_id: 1, rating: 4.5, comment: 'Amazing collection of art. Must visit!' },
  { id: 6, user_id: 10, place_id: 6, rating: 4.8, comment: 'Incredible Roman ruins with unique underground villas. A hidden gem in Tunisia!' }
];

// Réservations
const reservations = [
  { id: 1, user_id: 2, place_id: 1, event_id: 1, status: 'confirmed' },
  { id: 5, user_id: 6, place_id: 6, event_id: 5, status: 'confirmed' }
];

// Afficher les données insérées (simulation)
console.log('\nSimulation d\'insertion de données:');
console.log(chalk.green(`✓ ${users.length} utilisateurs insérés`));
console.log(chalk.green(`✓ ${places.length} lieux insérés`));
console.log(chalk.green(`✓ ${events.length} événements insérés`));
console.log(chalk.green(`✓ ${messages.length} messages insérés`));
console.log(chalk.green(`✓ ${reviews.length} avis insérés`));
console.log(chalk.green(`✓ ${reservations.length} réservations insérées`));

console.log('\n' + chalk.magenta('Initialisation terminée avec succès!'));
console.log(chalk.cyan('Pour créer la base de données et les tables:'));
console.log(chalk.yellow('1. Assurez-vous que MySQL est installé et en cours d\'exécution'));
console.log(chalk.yellow('2. Exécutez la commande: mysql -u [username] -p < database_schema.sql'));
console.log(chalk.yellow('3. Remplacez [username] par votre nom d\'utilisateur MySQL'));

console.log('\n' + chalk.cyan('Pour tester l\'envoi d\'un message et la création automatique de session:'));
console.log(chalk.white('1. Démarrez le serveur avec la commande: npm run dev'));
console.log(chalk.white('2. Envoyez une requête POST à /api/messages avec:'));
console.log(chalk.grey('   {'));
console.log(chalk.grey('     "senderId": 1,'));
console.log(chalk.grey('     "receiverId": 4,'));
console.log(chalk.grey('     "content": "Bonjour, je suis intéressé par votre hébergement"'));
console.log(chalk.grey('   }'));
console.log(chalk.white('3. Une nouvelle session sera automatiquement créée entre les utilisateurs 1 et 4 si elle n\'existe pas.'));

// Ajouter une note concernant le script dev manquant
console.log('\n' + chalk.red('IMPORTANT: Le script "dev" est manquant dans package.json'));
console.log(chalk.yellow('Vous devez ajouter manuellement le script suivant dans votre fichier package.json:'));
console.log(chalk.grey('  "scripts": {'));
console.log(chalk.grey('    "dev": "node src/server.js",'));
console.log(chalk.grey('    "build:dev": "vite build --mode development"'));
console.log(chalk.grey('    // ... autres scripts existants'));
console.log(chalk.grey('  }'));

// Create the setup-scripts.js if it doesn't exist
const setupScriptsPath = path.join(process.cwd(), 'scripts/setup-scripts.js');
if (!fs.existsSync(path.dirname(setupScriptsPath))) {
  fs.mkdirSync(path.dirname(setupScriptsPath), { recursive: true });
}

const setupScriptContent = `
const fs = require('fs');
const path = require('path');

// Function to add dev script to package.json if it doesn't exist
function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  // Read the existing package.json
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check if the dev script already exists
    if (!packageJson.scripts || !packageJson.scripts.dev) {
      console.log('Adding "dev" script to package.json...');
      
      // Add the dev script
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      packageJson.scripts.dev = 'node src/server.js';
      
      // Check if build:dev script exists
      if (!packageJson.scripts['build:dev']) {
        packageJson.scripts['build:dev'] = 'vite build --mode development';
      }
      
      // Write the updated package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Successfully added "dev" and "build:dev" scripts to package.json!');
      console.log('\\nYou can now run the server with: npm run dev');
    } else {
      console.log('The "dev" script already exists in package.json.');
    }
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
}

// Run the update function
updatePackageJson();
`;

// Save the setup script
fs.writeFileSync(setupScriptsPath, setupScriptContent, 'utf8');
console.log(chalk.green('\n✓ Script d\'installation créé: scripts/setup-scripts.js'));
console.log(chalk.yellow('Pour ajouter automatiquement les scripts manquants, exécutez:'));
console.log(chalk.white('   node scripts/setup-scripts.js'));
