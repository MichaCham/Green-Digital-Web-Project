// Import des modules
const express = require("express");
const { Pool } = require("pg");
const { getImpact } = require("./function");

// Configuration de la base de données
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: 5433, // Port par défaut de PostgreSQL
});

// Création de l'application Express
const app = express();
const port = 3000; // Port sur lequel le serveur écoutera

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("Serveur Node.js connecté à PostgreSQL");
});

// Route pour récupérer tous les projets
app.get("/projets", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM projet");
    const users = result.rows;
    client.release();
    res.json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des projets", err);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour récupérer un utilisateur par son ID
app.get("/projets/:nom", async (req, res) => {
  const nom = req.params.nom;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM projet WHERE nom = $1", [
      nom,
    ]);
    const projet = result.rows[0];
    client.release();
    if (!projet) {
      res.status(404).json({ message: "Projet non trouvé" });
    } else {
      res.json(projet);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur", err);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour créer un nouvel utilisateur
app.post("/projets", async (req, res) => {
  const { nom } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO projet (nom) VALUES ($1) RETURNING *",
      [nom]
    );
    const newUser = result.rows[0];
    client.release();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'utilisateur", err);
    res.status(500).send("Erreur serveur");
  }
});

// Route pour supprimer un utilisateur
app.delete("/projets/:nom", async (req, res) => {
  const nom = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "DELETE FROM projet WHERE nom = '$1' RETURNING *",
      [nom]
    );
    const deletedProjet = result.rows[0];
    client.release();
    if (!deletedProjet) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      res.json({
        message: "Utilisateur supprimé avec succès",
        user: deletedProjet,
      });
    }
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur", err);
    res.status(500).send("Erreur serveur");
  }
});

// Route to fetch all tables in the database
app.get("/impacts/:nom/:lots", async (req, res) => {
  try {
    const nom = req.params.nom;
    const lot = req.params.lot;
    getImpact(nom, lot);
    client.release();
    res.json(tables);
  } catch (err) {
    console.error("Error fetching tables", err);
    res.status(500).send("Server Error");
  }
});

app.post("/import", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Aucun fichier trouvé");
  }

  const filePath = req.file.path;

  try {
    const client = await pool.connect();
    const stream = fs.createReadStream(filePath).pipe(csvParser());

    stream.on("data", async (data) => {
      try {
      } catch (err) {
        console.error("Erreur lors de l'insertion des données", err);
      }
    });

    stream.on("end", () => {
      client.release();
      // Supprimer le fichier CSV après traitement
      fs.unlinkSync(filePath);
      res.send("Importation réussie");
    });
  } catch (err) {
    console.error("Erreur lors de la connexion à la base de données", err);
    res.status(500).send("Erreur serveur");
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
