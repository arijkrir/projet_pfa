const mongoose = require('mongoose');

const tireurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  nombreTirs: {
    type: Number,
    default: 0
  }
});

const Tireur = mongoose.model('Tireur', tireurSchema);

module.exports = Tireur;
