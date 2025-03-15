
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
}

module.exports = new SessionService();
