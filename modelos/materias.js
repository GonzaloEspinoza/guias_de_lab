'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = Schema({
  nombre: {
    type: String,
    require: true
  },
  sigla: {
    type: String,
    require: true
  }  
});


module.exports = mongoose.model('Materia', MateriaSchema);