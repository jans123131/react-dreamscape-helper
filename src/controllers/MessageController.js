
/**
 * Contrôleur pour la gestion des messages entre utilisateurs
 * Permet de créer, lire, mettre à jour et supprimer des messages
 * Utilise la table 'messagerie' dans la base de données
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
      // Filtres optionnels
      const userId = req.query.userId;
      const sessionId = req.query.sessionId;
      
      let messages = [];
      
      if (sessionId) {
        // Si un sessionId est fourni, récupérer les messages de cette session
        messages = await SessionService.getSessionMessages(parseInt(sessionId));
      } else if (userId) {
        // Si un userId est fourni, récupérer tous les messages de cet utilisateur
        messages = await SessionService.getUserMessages(parseInt(userId));
      } else {
        // Sinon, récupérer tous les messages (avec pagination potentielle)
        messages = await SessionService.getAllMessages();
      }
      
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
      
      const message = await SessionService.getMessageById(messageId);
      
      if (!message) {
        return res.status(404).json({
          status: 404,
          message: "Message non trouvé"
        });
      }
      
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
        session = await SessionService.getSessionById(parseInt(sessionId));
        if (!session) {
          return res.status(404).json({
            status: 404,
            message: "Session non trouvée"
          });
        }
      } 
      // Sinon, si un receiverId est fourni, trouver ou créer une session
      else if (receiverId) {
        // Chercher une session existante ou en créer une nouvelle
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
        content: content,
        // Conversion en format compatible avec la table messagerie
        id_expediteur: parseInt(senderId),
        id_destinataire: parseInt(receiverId),
        texte: content
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
      
      // Dans une implémentation réelle, vous mettriez à jour le message dans la base de données
      const updatedMessage = await SessionService.updateMessage(messageId, {
        is_read: read !== undefined ? read : true
      });
      
      if (!updatedMessage) {
        return res.status(404).json({
          status: 404,
          message: "Message non trouvé"
        });
      }
      
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
      
      // Dans une implémentation réelle, vous supprimeriez le message dans la base de données
      const deleted = await SessionService.deleteMessage(messageId);
      
      if (!deleted) {
        return res.status(404).json({
          status: 404,
          message: "Message non trouvé"
        });
      }
      
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
  
  /**
   * Récupère les messages entre deux utilisateurs
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async getConversation(req, res) {
    try {
      const userId1 = parseInt(req.query.userId1);
      const userId2 = parseInt(req.query.userId2);
      
      if (isNaN(userId1) || isNaN(userId2)) {
        return res.status(400).json({
          status: 400,
          message: "Les IDs des utilisateurs doivent être des nombres valides"
        });
      }
      
      const messages = await SessionService.getConversation(userId1, userId2);
      
      res.json({
        status: 200,
        data: messages
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la récupération de la conversation: ${error.message}`
      });
    }
  }
}

module.exports = new MessageController();
