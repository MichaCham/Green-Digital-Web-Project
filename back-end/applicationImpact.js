class ProjetApplication {
  constructor(nom_projet, date_lots, somme_impact, applications = []) {
    this.nom_projet = nom_projet;
    this.date_lots = date_lots;
    this.somme_impact = somme_impact;
    this.applications = applications;
  }
}

class Application {
  constructor(url, impact, nombre_requete, poid_page) {
    this.url = url;
    this.impact = impact;
    this.nombre_requete = nombre_requete;
    this.poid_page = poid_page;
  }
}
