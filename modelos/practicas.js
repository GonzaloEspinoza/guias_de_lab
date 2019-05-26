'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PracticaSchema = Schema({
    titulo: {
      type: Number,
      require: true
    },
    texto: {
      type: String,
      require: true
    },
    /*egisterDate: {
        type: Date,
        default: Date.now()
  }*/
});

module.exports = mongoose.model('Practica', PracticaSchema);