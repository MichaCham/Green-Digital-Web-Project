const { Pool } = require("pg");

// Configuration de la base de données
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: 5433,
});

// Fonction pour exécuter la requête SQL
async function fetchEquipementPhysique(id_lot) {
  try {
    const client = await pool.connect();
    const query = {
      text: `
        SELECT typeequipement as type, SUM(quantite) as quantites, etape_acv, SUM(impact) as impacts
        FROM equipement
        WHERE id_lot = $1
        GROUP BY typeequipement, etape_acv
      `,
      values: [id_lot],
    };
    const result = await client.query(query);
    client.release();
    return result.rows;
  } catch (err) {
    console.error("Erreur lors de l'exécution de la requête SQL", err);
    throw err;
  }
}

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function getImpact(projet, lot) {}

module.exports = { parseCSV, getImpact, fetchEquipementPhysique };
