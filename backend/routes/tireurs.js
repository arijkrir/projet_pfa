const express = require('express');
const Tireur = require('../models/Tireur');
const router = express.Router();

// Route pour ajouter un tireur
router.post('/ajouter', async (req, res) => {
  try {
    const { nom, prenom, grade } = req.body;
    const nouveauTireur = new Tireur({ nom, prenom, grade, nombreTirs: 0 });
    await nouveauTireur.save();
    res.status(201).json(nouveauTireur);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du tireur :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du tireur' });
  }
});

module.exports = router;
