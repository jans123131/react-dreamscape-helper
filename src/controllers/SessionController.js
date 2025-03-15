
/**
 * Contrôleur pour la gestion des sessions de messages entre utilisateurs
 * Permet de créer, lire, mettre à jour et supprimer des sessions
 */

const SessionService = require('../services/SessionService');

class SessionController {
  /**
   * Récupère toutes les sessions pour un utilisateur
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async getAllSessions(req, res) {
    try {
      // Vérifier si un userId est spécifié dans la requête
      const userId = req.query.userId;
      let sessions;

      if (userId) {
        // Si un userId est fourni, récupérer les sessions de cet utilisateur
        sessions = await SessionService.getUserSessions(parseInt(userId));
      } else {
        // Sinon, récupérer toutes les sessions
        sessions = await SessionService.getAllSessions();
      }

      res.json({
        status: 200,
        data: sessions
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la récupération des sessions: ${error.message}`
      });
    }
  }

  /**
   * Récupère une session spécifique par son ID
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async getSessionById(req, res) {
    try {
      const sessionId = parseInt(req.params.id);
      
      if (isNaN(sessionId)) {
        return res.status(400).json({
          status: 400,
          message: "L'ID de la session doit être un nombre valide"
        });
      }
      
      const session = await SessionService.getSessionById(sessionId);
      
      if (!session) {
        return res.status(404).json({
          status: 404,
          message: "Session non trouvée"
        });
      }
      
      res.json({
        status: 200,
        data: session
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la récupération de la session: ${error.message}`
      });
    }
  }

  /**
   * Crée une nouvelle session entre deux utilisateurs
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async createSession(req, res) {
    try {
      const { userId1, userId2 } = req.body;
      
      // Validation des entrées
      if (!userId1 || !userId2) {
        return res.status(400).json({
          status: 400,
          message: 'Les identifiants des deux utilisateurs sont requis'
        });
      }
      
      // Création de la session
      const newSession = await SessionService.createSession({
        userId1: parseInt(userId1),
        userId2: parseInt(userId2)
      });
      
      res.status(201).json({
        status: 201,
        data: newSession
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: `Erreur lors de la création de la session: ${error.message}`
      });
    }
  }

  /**
   * Met à jour une session existante
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async updateSession(req, res) {
    try {
      const sessionId = parseInt(req.params.id);
      
      if (isNaN(sessionId)) {
        return res.status(400).json({
          status: 400,
          message: "L'ID de la session doit être un nombre valide"
        });
      }
      
      const updateData = req.body;
      
      // Mise à jour de la session
      const updatedSession = await SessionService.updateSession(sessionId, updateData);
      
      res.json({
        status: 200,
        data: updatedSession
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la mise à jour de la session: ${error.message}`
      });
    }
  }

  /**
   * Supprime une session
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async deleteSession(req, res) {
    try {
      const sessionId = parseInt(req.params.id);
      
      if (isNaN(sessionId)) {
        return res.status(400).json({
          status: 400,
          message: "L'ID de la session doit être un nombre valide"
        });
      }
      
      await SessionService.deleteSession(sessionId);
      
      res.status(204).json({
        status: 204,
        message: 'Session supprimée avec succès'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `Erreur lors de la suppression de la session: ${error.message}`
      });
    }
  }
  
  /**
   * Récupère toutes les messages d'une session
   * @param {Object} req - La requête HTTP
   * @param {Object} res - La réponse HTTP
   */
  async getSessionMessages(req, res) {
    try {
      const sessionId = parseInt(req.params.id);
      
      if (isNaN(sessionId)) {
        return res.status(400).json({
          status: 400,
          message: "L'ID de la session doit être un nombre valide"
        });
      }
      
      const messages = await SessionService.getSessionMessages(sessionId);
      
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
}

module.exports = new SessionController();
