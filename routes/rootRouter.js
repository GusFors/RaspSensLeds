'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/rootController')

router.route('/').get(controller.getRoot)

module.exports = router
