const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Assurez-vous de remplacer par le mot de passe de votre base de données
    database: "banqueDb" // Assurez-vous de remplacer par le nom de votre base de données
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// GET all accounts
app.get("/", (req, res) => {
    // Première requête pour sélectionner toutes les données des clients bancaires
    const sqlClients = "SELECT *, CASE WHEN solde < 1000 THEN 'Insuffisant' WHEN solde >= 1000 AND solde <= 5000 THEN 'Moyen' ELSE 'Élevé' END AS obs FROM ClientBancaire;";
    
    // Deuxième requête pour récupérer le solde total
    const sqlTotalBalance = "SELECT SUM(solde) AS totalBalance FROM ClientBancaire;";
    
    // Troisième requête pour récupérer le solde minimum
    const sqlMinBalance = "SELECT CONCAT(MIN(solde), ' Ariary') AS minBalance FROM ClientBancaire;";
    
    // Quatrième requête pour récupérer le solde maximum
    const sqlMaxBalance = "SELECT CONCAT(MAX(solde), ' Ariary') AS maxBalance FROM ClientBancaire;";
    
    // Exécution de toutes les requêtes en parallèle
    db.query(sqlClients, (errClients, dataClients) => {
      if (errClients) return res.json({ error: "Error fetching clients data" });
  
      db.query(sqlTotalBalance, (errTotalBalance, dataTotalBalance) => {
        if (errTotalBalance) return res.json({ error: "Error fetching total balance" });
  
        db.query(sqlMinBalance, (errMinBalance, dataMinBalance) => {
          if (errMinBalance) return res.json({ error: "Error fetching minimum balance" });
  
          db.query(sqlMaxBalance, (errMaxBalance, dataMaxBalance) => {
            if (errMaxBalance) return res.json({ error: "Error fetching maximum balance" });
  
            // Renvoyer les résultats dans un objet JSON
            return res.json({
              clients: dataClients,
              totalBalance: dataTotalBalance[0].totalBalance,
              minBalance: dataMinBalance[0].minBalance,
              maxBalance: dataMaxBalance[0].maxBalance
            });
          });
        });
      });
    });
  });
  

// GET account by account number
app.get("/:num_compte",(req,res) =>{
    const num_compte = req.params.num_compte;
    const sql = "SELECT * FROM ClientBancaire WHERE num_compte = ?";
    db.query(sql, num_compte, (err, data) =>{
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL : ' + err.stack);
            return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
        }
        return res.json(data);
    });
});

// POST a new account
app.post("/", (req, res) => {
    const sql = "INSERT INTO ClientBancaire (num_compte, nom, solde) VALUES (?, ?, ?)";
    const { num_compte, nom, solde } = req.body;
    const values = [num_compte, nom, solde];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL : ' + err.stack);
            return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
        }
        return res.status(201).json({ message: 'Compte ajouté avec succès', account_id: result.insertId });
    });
});

// PUT (update) an existing account
app.put("/:num_compte", (req, res) => {
    const num_compte = req.params.num_compte;
    const { nom, solde } = req.body;
    const sql = "UPDATE ClientBancaire SET nom = ?, solde = ? WHERE num_compte = ?";
    const values = [nom, solde, num_compte];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL : ' + err.stack);
            return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Compte non trouvé' });
        }
        return res.status(200).json({ message: 'Compte mis à jour avec succès', account_id: num_compte });
    });
});

// DELETE an account
app.delete("/:num_compte", (req, res) => {
    const num_compte = req.params.num_compte;
    const sql = "DELETE FROM ClientBancaire WHERE num_compte = ?";
    db.query(sql, num_compte, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL : ' + err.stack);
            return res.status(500).json({ error: 'Erreur lors de l\'exécution de la requête SQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Compte non trouvé' });
        }
        return res.status(200).json({ message: 'Compte supprimé avec succès', account_id: num_compte });
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Serveur démarré sur le port " + PORT);
});
