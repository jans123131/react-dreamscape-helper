
const Promotion = require("../models/promotionModel");
const Place = require("../models/placeModel");
const { validationResult } = require("express-validator");

// Récupérer toutes les promotions
exports.getAllPromotions = async (req, res) => {
  try {
    // Pour les fournisseurs, montrer uniquement leurs promotions
    if (req.user.role === 'provider') {
      req.query.created_by = req.user.id;
    }
    
    const promotions = await Promotion.getAll(req.query);
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une promotion par son ID
exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.getById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion non trouvée" });
    }
    
    // Vérifier si le fournisseur a accès à cette promotion
    if (req.user.role === 'provider' && promotion.created_by !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé à accéder à cette promotion" });
    }
    
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une promotion
exports.createPromotion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Ajouter l'identifiant de l'utilisateur qui crée la promotion
    const promotionData = {
      ...req.body,
      created_by: req.user.id
    };

    // Vérifier si le lieu existe
    const place = await Place.getById(promotionData.place_id);
    if (!place) {
      return res.status(404).json({ message: "Lieu non trouvé" });
    }
    
    // Si l'utilisateur est un fournisseur, vérifier s'il est propriétaire du lieu
    if (req.user.role === 'provider') {
      if (place.provider_id !== req.user.id) {
        return res.status(403).json({ message: "Non autorisé à créer des promotions pour ce lieu" });
      }
    }

    const promotionId = await Promotion.create(promotionData);
    
    const promotion = await Promotion.getById(promotionId);
    res.status(201).json({
      message: "Promotion créée avec succès",
      promotion
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une promotion
exports.updatePromotion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Vérifier si la promotion existe
    const promotion = await Promotion.getById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion non trouvée" });
    }

    // Vérifier si l'utilisateur a la permission de mettre à jour
    if (req.user.role === 'provider' && promotion.created_by !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé à mettre à jour cette promotion" });
    }
    
    // Si changement de lieu, vérifier si le fournisseur est propriétaire du nouveau lieu
    if (req.user.role === 'provider' && req.body.place_id && req.body.place_id !== promotion.place_id) {
      const place = await Place.getById(req.body.place_id);
      if (!place || place.provider_id !== req.user.id) {
        return res.status(403).json({ message: "Non autorisé à utiliser ce lieu" });
      }
    }

    await Promotion.update(req.params.id, req.body);
    
    const updatedPromotion = await Promotion.getById(req.params.id);
    res.json({
      message: "Promotion mise à jour avec succès",
      promotion: updatedPromotion
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une promotion
exports.deletePromotion = async (req, res) => {
  try {
    // Vérifier si la promotion existe
    const promotion = await Promotion.getById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: "Promotion non trouvée" });
    }

    // Vérifier si l'utilisateur a la permission de supprimer
    if (req.user.role === 'provider' && promotion.created_by !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé à supprimer cette promotion" });
    }

    await Promotion.delete(req.params.id);
    res.json({ message: "Promotion supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer les promotions actives pour un lieu
exports.getActivePromotions = async (req, res) => {
  try {
    const placeId = req.params.placeId;
    
    // Vérifier si le lieu existe
    const place = await Place.getById(placeId);
    if (!place) {
      return res.status(404).json({ message: "Lieu non trouvé" });
    }
    
    const promotions = await Promotion.getActivePromotions(placeId);
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
