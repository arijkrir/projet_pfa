const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  groups: {
    type: [String],
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  date: { // Ajoutez le champ date
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Seance', seanceSchema);
