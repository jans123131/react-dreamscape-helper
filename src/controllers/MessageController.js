
/**
 * Contrôleur pour la gestion des messages entre utilisateurs
 * Permet de créer, lire, mettre à jour et supprimer des messages
 */

const SessionService = require('../services/SessionService');

class MessageController {
  /**
   * Récupère tous les messages
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async getAllMessages(req, res) {
    try {
      // Simulation de récupération de messages depuis une base de données
      const messages = [
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
      ];
      
      res.json({
        status: 200,
        data: messages
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la récupération des messages: ${error.message}`
      });
    }
  }

  /**
   * Récupère un message spécifique par son ID
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async getMessageById(req, res) {
    try {
      const messageId = parseInt(req.params.id);
      
      if (isNaN(messageId)) {
        return res.status(400).json({
          status: 400,
          message: "L'ID du message doit être un nombre valide"
        });
      }
      
      // Simulation de récupération d'un message depuis une base de données
      const message = {
        id: messageId,
        sessionId: 1,
        senderId: 1,
        content: 'Bonjour, j\'ai une question sur Bulla Regia.',
        createdAt: '2023-08-15T14:30:00Z',
        read: true
      };
      
      res.json({
        status: 200,
        data: message
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la récupération du message: ${error.message}`
      });
    }
  }

  /**
   * Crée un nouveau message
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async createMessage(req, res) {
    try {
      const { senderId, receiverId, content, sessionId } = req.body;
      
      // Validation des entrées
      if (!senderId) {
        return res.status(400).json({
          status: 400,
          message: "L'identifiant de l'expéditeur est requis"
        });
      }
      
      if (!content) {
        return res.status(400).json({
          status: 400,
          message: "Le contenu du message est requis"
        });
      }
      
      let session;
      
      // Si un sessionId est fourni, utiliser cette session
      if (sessionId) {
        // Dans une implémentation réelle, vous vérifieriez si la session existe
        session = await SessionService.getSessionById(parseInt(sessionId));
      } 
      // Sinon, si un receiverId est fourni, trouver ou créer une session
      else if (receiverId) {
        session = await SessionService.findOrCreateSession(
          parseInt(senderId),
          parseInt(receiverId)
        );
      } else {
        return res.status(400).json({
          status: 400,
          message: "L'identifiant du destinataire ou de la session est requis"
        });
      }
      
      // Ajouter le message à la session
      const message = await SessionService.addMessageToSession(session.id, {
        senderId: parseInt(senderId),
        content
      });
      
      res.status(201).json({
        status: 201,
        data: message,
        session: session
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Erreur lors de la création du message: ${error.message}`
      });
    }
  }

  /**
   * Met à jour un message existant (marquer comme lu)
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async updateMessage(req, res) {
    try {
      const messageId = parseInt(req.params.id);
      const { read } = req.body;
      
      if (isNaN(messageId)) {
        return res.status(400).json({
          status: 400,
          message: "L'ID du message doit être un nombre valide"
        });
      }
      
      // Simulation de mise à jour d'un message dans une base de données
      const updatedMessage = {
        id: messageId,
        sessionId: 1,
        senderId: 2,
        content: 'Bien sûr, comment puis-je vous aider?',
        createdAt: '2023-08-15T14:35:00Z',
        read: read !== undefined ? read : true,
        updatedAt: new Date().toISOString()
      };
      
      res.json({
        status: 200,
        data: updatedMessage
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la mise à jour du message: ${error.message}`
      });
    }
  }

  /**
   * Supprime un message
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async deleteMessage(req, res) {
    try {
      const messageId = parseInt(req.params.id);
      
      if (isNaN(messageId)) {
        return res.status(400).json({
          status: 400,
          message: "L'ID du message doit être un nombre valide"
        });
      }
      
      // Simulation de suppression d'un message dans une base de données
      
      res.status(204).json({
        status: 204,
        message: 'Message supprimé avec succès'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la suppression du message: ${error.message}`
      });
    }
  }
}

module.exports = new MessageController();
