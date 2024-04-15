// Définition de la classe EtapeVie
class EtapeVie {
  constructor(etape, impact) {
    this.etape = etape;
    this.impact = impact;
  }
}

// Définition de la classe Equipement
class Equipement {
  constructor(type, somme_impact, quantite, etapes_vie = []) {
    this.type = type;
    this.somme_impact = somme_impact;
    this.etapes_vie = etapes_vie;
    this.quantite = quantite;
  }
}

// Définition de la classe Projet
class ProjetEquipementsPhysique {
  constructor(nom_projet, date_lots, somme_impact, equipements = []) {
    this.nom_projet = nom_projet;
    this.date_lots = date_lots;
    this.somme_impact = somme_impact;
    this.equipements = equipements;
  }
}

// Export des classes
module.exports = {
  ProjetEquipementsPhysique,
  Equipement,
  EtapeVie,
};
