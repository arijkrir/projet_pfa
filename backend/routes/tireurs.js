const express = require('express');
const router = express.Router();
const Tireur = require('../models/Tireur');

// Route pour obtenir tous les tireurs
router.get('/', async (req, res) => {
  try {
    const tireurs = await Tireur.find();
    res.status(200).json(tireurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des tireurs :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tireurs' });
  }
});

// Route pour ajouter un tireur
router.post('/ajouter', async (req, res) => {
  const { nom, prenom, grade, nombreTirs } = req.body;
  const tireur = new Tireur({ nom, prenom, grade, nombreTirs });

  try {
    const nouveauTireur = await tireur.save();
    res.status(201).json(nouveauTireur);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du tireur :', error);
    res.status(400).json({ message: 'Erreur lors de l\'ajout du tireur' });
  }
});

// Route pour supprimer un tireur
router.delete('/supprimer/:id', async (req, res) => {
  try {
    const tireur = await Tireur.findByIdAndDelete(req.params.id);
    if (!tireur) {
      return res.status(404).json({ message: 'Tireur non trouvé' });
    }
    res.status(200).json({ message: 'Tireur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du tireur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du tireur' });
  }
});

// Route pour modifier un tireur
router.put('/modifier/:id', async (req, res) => {
  const { nom, prenom, grade } = req.body;
  try {
    const tireur = await Tireur.findByIdAndUpdate(req.params.id, { nom, prenom, grade,nombreTirs }, { new: true });
    if (!tireur) {
      return res.status(404).json({ message: 'Tireur non trouvé' });
    }
    res.status(200).json(tireur);
  } catch (error) {
    console.error('Erreur lors de la modification du tireur :', error);
    res.status(500).json({ message: 'Erreur lors de la modification du tireur' });
  }
});

module.exports = router;
