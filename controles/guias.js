'use strict'

// Import models

const Practica = require('../modelos/practicas')
const Materia = require('../modelos/materias')
const Image = require('../modelos/image');
const file = require('file');
// Controllers definition

function getPractica (req, res) {
  let guideId = req.params.guideId

  Practica.findById(guideId, (err, practica) => {
    if (err) {
      return res.status(500).send({
        message: `Error performing request: ${err}`
      })
    }
    if (!practica) {
      return res.status(404).send({
        message: `The guide doesn't exist.`
      })
    }
    res.status(200).send({ practica })
  })
}

function getPractica (req, res) {
    Practica.find({}, (err, practica) => {
    if (err) {
      return res.status(500).send({
        message: `Error performing request: ${err}`
      })
    }
    if (!practica) {
      return res.status(404).send({
        message: `There aren't guides.`
      })
    }
    res.status(200).send({ practica })
  })
}
///////////////materia////////////////////
function getMateria (req, res) {
  Materia.find({}, (err, materia) => {
  if (err) {
    return res.status(500).send({
      message: `Error performing request: ${err}`
    })
  }
  if (!materia) {
    return res.status(404).send({
      message: `There aren't guides.`
    })
  }
  res.status(200).send({ materia })
})
}

function saveMateria (req, res) {

  console.log(req.body)
    let materia = new Materia()
    materia.nombre =  req.body.nombre;
    materia.sigla =  req.body.sigla;
    materia.save((err, materiaStored)=>{
        if(err) res.status(500).send({message:`Error al guardar en la BD ${err}`})

        res.status(200).send({materia: materiaStored})
    })
};

//////////////////////////////////////////

function savePractica (req, res) {

  console.log(req.body)
    let practica = new Practica()
    practica.titulo =  req.body.titulo;
    practica.texto =  req.body.texto;
    practica.save((err, practicaStored)=>{
      console.log(req.practicaStored)
        if(err) res.status(500).send({message:`Error al guardar en la BD ${err}`})

        res.status(200).send({practica: practicaStored})
        
    })
};

function updatePractica (req, res) {
  let guideId = req.params.guideId
  let update = req.body

  Practica.findByIdAndUpdate(guideId, update, (err, guideUpdated) => {
    if (err) {
      res.status(500).send({
        message: `Error to update the guide: ${err}`
      })
    }
    res.status(200).send({
      guide: guideUpdated
    })
  })
}

function deletePractica (req, res) {
  let guideId = req.params.guideId

  Practica.findById(guideId, (err, guide) => {
    if (err) {
      res.status(500).send({
        message: `Error to delete the guide: ${err}`
      })
    }

    guide.remove(err => {
      if (err) {
        res.status(500).send({
          message: `Error to delete the guide: ${err}`
        })
      }
      res.status(200).send({
        message: `The guide has delete.`
      })
    })
  })
}

//////////////subir
function subir (req, res){
    const image = new Image();
    image.filename = image.file.filename;
    image.path = '/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.size = req.file.size;

    image.save();
}

module.exports = {
  getPractica,
  getPractica,
  savePractica,
  getMateria,
  saveMateria,
  updatePractica,
  deletePractica,
  subir
}