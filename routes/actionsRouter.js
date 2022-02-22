'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/actionsController')

router.route('/')
  .get(controller.getActions)

router.route('/ledmessage')
  .get(controller.getLedMessage)
  .post(controller.postLedMessage)
module.exports = router
