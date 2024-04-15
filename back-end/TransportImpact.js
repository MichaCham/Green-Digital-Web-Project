class ProjetTrajets {
  constructor(nom_projet, date_lots, somme_impact, trajets = []) {
    this.nomProjet = nom_projet;
    this.dateLots = date_lots;
    this.sommeImpact = somme_impact;
    this.trajets = trajets;
  }
}

class Trajet {
  constructor(
    quantitePersonnes,
    kmVoyageTGV,
    kmVoyageVoiture,
    kmVoyageBus,
    kmVoyageTer,
    kmVoyageMetro
  ) {
    this.quantitePersonnes = quantitePersonnes;
    this.kmVoyageTGV = kmVoyageTGV;
    this.kmVoyageVoiture = kmVoyageVoiture;
    this.kmVoyageBus = kmVoyageBus;
    this.kmVoyageTer = kmVoyageTer;
    this.kmVoyageMetro = kmVoyageMetro;
  }
}

class ImpactTrajet {
  constructor(distance, impact) {
    this.distance = distance;
    this.impact = impact;
  }
}
