
/**
 * Routes pour la gestion des messages entre utilisateurs
 */

const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

// Route pour récupérer tous les messages (avec filtres optionnels via query params)
router.get('/', MessageController.getAllMessages);

// Route pour récupérer un message spécifique
router.get('/:id', MessageController.getMessageById);

// Route pour récupérer une conversation entre deux utilisateurs
router.get('/conversation', MessageController.getConversation);

// Route pour créer un nouveau message
router.post('/', MessageController.createMessage);

// Route pour mettre à jour un message (marquer comme lu)
router.put('/:id', MessageController.updateMessage);

// Route pour supprimer un message
router.delete('/:id', MessageController.deleteMessage);

module.exports = router;
