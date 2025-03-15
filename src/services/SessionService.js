
/**
 * Service pour gérer la logique métier des sessions
 */

const Session = require('../models/Session');

class SessionService {
  /**
   * Récupère toutes les sessions d'un utilisateur
   * @param {Number} userId - L'ID de l'utilisateur
   * @returns {Promise<Array>} Liste des sessions
   */
  async getUserSessions(userId) {
    // Dans une implémentation réelle, vous récupéreriez les données depuis la base de données
    // Pour cette démonstration, nous retournons des données fictives
    
    return [
      {
        id: 1,
        userId1: userId,
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
        userId1: userId,
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
          senderId: userId,
          createdAt: '2023-08-26T16:40:00Z'
        }
      }
    ];
  }

  /**
   * Récupère toutes les sessions
   * @returns {Promise<Array>} Liste de toutes les sessions
   */
  async getAllSessions() {
    // Dans une implémentation réelle, vous récupéreriez les données depuis la base de données
    return [
      {
        id: 1,
        userId1: 1,
        userId2: 2,
        lastMessageAt: '2023-08-15T14:35:00Z',
        isActive: true,
        createdAt: '2023-08-15T14:30:00Z'
      },
      {
        id: 2,
        userId1: 1,
        userId2: 3,
        lastMessageAt: '2023-08-26T16:40:00Z',
        isActive: true,
        createdAt: '2023-08-26T16:40:00Z'
      }
    ];
  }

  /**
   * Récupère une session par son ID
   * @param {Number} sessionId - L'ID de la session
   * @returns {Promise<Object>} Session avec les données des utilisateurs et messages
   */
  async getSessionById(sessionId) {
    // Dans une implémentation réelle, vous récupéreriez les données depuis la base de données
    return {
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
    };
  }

  /**
   * Crée une nouvelle session
   * @param {Object} sessionData - Les données de la session à créer
   * @returns {Promise<Object>} La session créée
   */
  async createSession(sessionData) {
    // Valider les données
    const validation = Session.validate(sessionData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    // Dans une implémentation réelle, vous inséreriez dans la base de données
    const newSession = new Session({
      id: Math.floor(Math.random() * 1000) + 3, // Simuler un ID auto-généré
      userId1: sessionData.userId1,
      userId2: sessionData.userId2,
      lastMessageAt: null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return newSession.toJSON();
  }

  /**
   * Met à jour une session existante
   * @param {Number} sessionId - L'ID de la session à mettre à jour
   * @param {Object} updateData - Les données à mettre à jour
   * @returns {Promise<Object>} La session mise à jour
   */
  async updateSession(sessionId, updateData) {
    // Dans une implémentation réelle, vous mettriez à jour la base de données
    return {
      id: sessionId,
      userId1: 1,
      userId2: 2,
      lastMessageAt: '2023-08-15T14:35:00Z',
      isActive: updateData.isActive !== undefined ? updateData.isActive : false,
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Supprime une session
   * @param {Number} sessionId - L'ID de la session à supprimer
   * @returns {Promise<Boolean>} True si la suppression a réussi
   */
  async deleteSession(sessionId) {
    // Dans une implémentation réelle, vous supprimeriez de la base de données
    return true;
  }

  /**
   * Vérifie si une session existe entre deux utilisateurs et en crée une si nécessaire
   * @param {Number} userId1 - L'ID du premier utilisateur
   * @param {Number} userId2 - L'ID du deuxième utilisateur
   * @returns {Promise<Object>} La session existante ou nouvelle
   */
  async findOrCreateSession(userId1, userId2) {
    // Dans une implémentation réelle, vous chercheriez dans la base de données
    // Pour cette démonstration, nous simulons une recherche
    
    // Ordonner les IDs utilisateurs pour assurer la cohérence
    const [smallerId, largerId] = userId1 < userId2 
      ? [userId1, userId2] 
      : [userId2, userId1];
    
    // Simuler une recherche dans les données existantes
    const existingSessions = await this.getAllSessions();
    const existingSession = existingSessions.find(session => 
      (session.userId1 === smallerId && session.userId2 === largerId) ||
      (session.userId1 === largerId && session.userId2 === smallerId)
    );
    
    if (existingSession) {
      console.log(`Session existante trouvée: ${existingSession.id}`);
      return existingSession;
    }
    
    // Créer une nouvelle session si aucune n'existe
    console.log(`Création d'une nouvelle session entre ${userId1} et ${userId2}`);
    const newSession = await this.createSession({
      userId1: smallerId,
      userId2: largerId
    });
    
    return newSession;
  }

  /**
   * Ajoute un message à une session
   * @param {Number} sessionId - L'ID de la session
   * @param {Object} messageData - Les données du message
   * @returns {Promise<Object>} Le message créé et la session mise à jour
   */
  async addMessageToSession(sessionId, messageData) {
    // Dans une implémentation réelle, vous inséreriez dans la base de données
    // et mettriez à jour la date du dernier message de la session
    
    const message = {
      id: Math.floor(Math.random() * 1000) + 3, // Simuler un ID auto-généré
      sessionId: sessionId,
      senderId: messageData.senderId,
      content: messageData.content,
      read: false,
      createdAt: new Date().toISOString()
    };

    // Mettre à jour la session avec la date du dernier message
    await this.updateSession(sessionId, { lastMessageAt: message.createdAt });

    return message;
  }

  /**
   * Récupère tous les messages d'une session
   * @param {Number} sessionId - L'ID de la session
   * @returns {Promise<Array>} Liste des messages de la session
   */
  async getSessionMessages(sessionId) {
    // Dans une implémentation réelle, vous récupéreriez depuis la base de données
    return [
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
    ];
  }
}

module.exports = new SessionService();
