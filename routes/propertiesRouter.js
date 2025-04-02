'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/propertiesController')

router.route('/').get(controller.getProperties)

router.route('/temperature').get(controller.getTemperature)

router.route('/humidity').get(controller.getHumidity)

router.route('/pressure').get(controller.getPressure)

router.route('/ledmessage').get(controller.getLedmessage)

module.exports = router
