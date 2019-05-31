'use strict'

// Import models

const Practica = require('../modelos/practicas')
const Materia = require('../modelos/materias')
const uploads = require('../app');
// Controllers definition

function getPracticaId (req, res) {
  let pId = req.params.pId

    Practica.findById(pId,(err,practica)=> {
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!practica) return res.status(404).send({message:`El producto no existe`})
        res.status(200).send({practica})
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
  let pId = req.params.pId
  let update = req.body//rescata los campos del cuerpo

  Practica.findByIdAndUpdate(pId, update, (err, pUpdated)=>{//la funcion actualiza mediante el id
      if(err) res.status(500).send({message: `Error al actualizar el producto:${err}`})

      res.status(200).send({practica: pUpdated})
    })

}

function deletePractica (req, res) {
  let pId = req.params.pId

  Practica.findById(pId, (err, practica)=>{
    if(err) res.status(500).send({message: `Error al borrar el producto:${err}`})

    practica.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el producto:${err}`})
      res.status(200).send({message: "El producto ha sido eliminado"})
    })
  })
} 

//////////////subir
function subir (req, res){
    uploads(req,res,(err)=>{
      console.log(req.file)
      if(err){
        res.status(500).json({
          message: "no se pudo guardar"
        })
      }else{
        var ruta = req.file.path.substr(6, req.file.path.length)
        var img = {
          name: req.file.originalname,
          physicalpath: req.file.path,
          relativepath: 'http://localhost:7777',
          size: req.file.size
        }
      }
      res.status(200).send(img)
    })
}

module.exports = {
  getPractica,
  getPracticaId,
  savePractica,
  getMateria,
  saveMateria,
  updatePractica,
  deletePractica,
  subir
}