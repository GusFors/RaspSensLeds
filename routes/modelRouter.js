'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/modelController')

router.route('/').get(controller.getModel)

module.exports = router
