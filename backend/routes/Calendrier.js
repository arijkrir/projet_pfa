const express = require('express');
const router = express.Router();
const Seance = require('../models/Seance');

// Route POST pour ajouter une séance
router.post('/', async (req, res) => {
  try {
    const { type, groups, startTime, endTime, date } = req.body; // Ajoutez 'date' au destructuring
    const newSeance = new Seance({
      type,
      groups,
      startTime,
      endTime,
      date // Ajoutez 'date' à l'objet Seance
    });
    const seance = await newSeance.save();
    res.status(201).json(seance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la séance' });
  }
});

// Route GET pour récupérer les séances par date
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const seances = await Seance.find({ date });
    res.status(200).json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des séances' });
  }
});

module.exports = router;
