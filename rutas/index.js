'use strict'

const express = require('express')
const guideCtrl = require('../controles/guias')
const router = express.Router()

// Routes

router.get('/practica', guideCtrl.getPractica)
router.get('/practica/:guideId', guideCtrl.getPractica)
router.post('/practica', guideCtrl.savePractica)
router.put('/practica/:guideId', guideCtrl.updatePractica)
router.delete('/practica/:guideId', guideCtrl.deletePractica)
//////////
router.get('/materia', guideCtrl.getMateria)
router.post('/materia', guideCtrl.saveMateria)


module.exports = router
