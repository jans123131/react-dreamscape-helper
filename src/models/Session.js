
/**
 * Modèle représentant une session de messages entre deux utilisateurs
 * Mappage vers la table 'messagerie' dans la base de données
 */

class Session {
  /**
   * Crée une nouvelle instance de Session
   * @param {Object} data - Les données de la session
   */
  constructor(data) {
    this.id = data.id;
    this.userId1 = data.userId1 || data.id_expediteur; // Mapping à id_expediteur
    this.userId2 = data.userId2 || data.id_destinataire; // Mapping à id_destinataire
    this.lastMessageAt = data.lastMessageAt || data.date_envoye ? new Date(data.lastMessageAt || data.date_envoye) : new Date();
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || data.created_at ? new Date(data.createdAt || data.created_at) : new Date();
    this.updatedAt = data.updatedAt || data.updated_at ? new Date(data.updatedAt || data.updated_at) : new Date();
    
    // Champs spécifiques pour les messages
    this.content = data.content || data.texte;
    this.read = data.read !== undefined ? data.read : (data.is_read !== undefined ? data.is_read : false);
  }

  /**
   * Convertit l'objet Session en un objet JSON standard
   * @returns {Object} L'objet Session au format JSON
   */
  toJSON() {
    return {
      id: this.id,
      userId1: this.userId1, // Dans la BD: id_expediteur
      userId2: this.userId2, // Dans la BD: id_destinataire
      lastMessageAt: this.lastMessageAt ? this.lastMessageAt.toISOString() : null, // Dans la BD: date_envoye du dernier message
      isActive: this.isActive,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
  
  /**
   * Convertit l'objet Session en format compatible avec la table 'messagerie'
   * @returns {Object} L'objet au format de la table messagerie
   */
  toDBFormat() {
    return {
      id: this.id,
      id_expediteur: this.userId1,
      id_destinataire: this.userId2,
      texte: this.content || '',
      date_envoye: this.lastMessageAt ? this.lastMessageAt.toISOString() : new Date().toISOString(),
      is_read: this.read || false,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString()
    };
  }

  /**
   * Valide les données d'une session
   * @param {Object} data - Les données à valider
   * @returns {Object} Objet contenant le résultat de la validation et les éventuelles erreurs
   */
  static validate(data) {
    const errors = [];

    // Vérifier les champs obligatoires
    if (!data.userId1 && !data.id_expediteur) {
      errors.push('Le champ userId1/id_expediteur est obligatoire');
    }
    
    if (!data.userId2 && !data.id_destinataire) {
      errors.push('Le champ userId2/id_destinataire est obligatoire');
    }

    // Vérifier que les deux utilisateurs sont différents
    const user1 = data.userId1 || data.id_expediteur;
    const user2 = data.userId2 || data.id_destinataire;
    
    if (user1 === user2) {
      errors.push('Les deux utilisateurs doivent être différents');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = Session;
