const mongoose = require('mongoose');

const utilisateursSchema = new mongoose.Schema({
  name : String,
  number : { type : Number, min : 1 ,default : 100},
  login : { type : String, required : true, unique : true},
  password : { type : String, required : true},
  admin : { type : Boolean, default: false }
  });

module.exports = utilisateursSchema;

const dbConnection = require('../controllers/db.controller'); // importation de l'objet qui gère la connexion

const Utilisateurs = dbConnection.model('Utilisateurs', utilisateursSchema, 'utilisateurs'); // création du modèle qui lie le schéma à la collection books

module.exports.model = Utilisateurs; // export du modèle
