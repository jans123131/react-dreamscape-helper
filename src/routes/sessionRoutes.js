
/**
 * Routes pour la gestion des sessions de messages entre utilisateurs
 */

const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SessionController');

// Route pour récupérer toutes les sessions
router.get('/', SessionController.getAllSessions);

// Route pour récupérer une session spécifique
router.get('/:id', SessionController.getSessionById);

// Route pour créer une nouvelle session
router.post('/', SessionController.createSession);

// Route pour mettre à jour une session
router.put('/:id', SessionController.updateSession);

// Route pour supprimer une session
router.delete('/:id', SessionController.deleteSession);

// Route pour récupérer tous les messages d'une session
router.get('/:id/messages', SessionController.getSessionMessages);

module.exports = router;
