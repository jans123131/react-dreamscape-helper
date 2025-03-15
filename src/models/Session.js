
/**
 * Modèle représentant une session de messages entre deux utilisateurs
 */

class Session {
  /**
   * Crée une nouvelle instance de Session
   * @param {Object} data - Les données de la session
   */
  constructor(data) {
    this.id = data.id;
    this.userId1 = data.userId1;
    this.userId2 = data.userId2;
    this.lastMessageAt = data.lastMessageAt ? new Date(data.lastMessageAt) : null;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
  }

  /**
   * Convertit l'objet Session en un objet JSON standard
   * @returns {Object} L'objet Session au format JSON
   */
  toJSON() {
    return {
      id: this.id,
      userId1: this.userId1,
      userId2: this.userId2,
      lastMessageAt: this.lastMessageAt ? this.lastMessageAt.toISOString() : null,
      isActive: this.isActive,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
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
    if (!data.userId1) {
      errors.push('Le champ userId1 est obligatoire');
    }
    
    if (!data.userId2) {
      errors.push('Le champ userId2 est obligatoire');
    }

    // Vérifier que les deux utilisateurs sont différents
    if (data.userId1 === data.userId2) {
      errors.push('Les deux utilisateurs doivent être différents');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = Session;
