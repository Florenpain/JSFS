const mongoose = require('mongoose');

const objetsSchema = new mongoose.Schema({
  description : String,
  prix : { type : Number, min : 1 ,default : 0},
  userId: mongoose.ObjectId
  });

module.exports = objetsSchema;
const dbConnection = require('../controllers/db.controller');  // importation de l'objet qui gère la connexion

const Objets = dbConnection.model('Objets', objetsSchema, 'objets'); // création du modèle qui lie le schéma à la collection books

module.exports.model = Objets;                     // export du modèle
