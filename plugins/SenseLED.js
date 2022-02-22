'use strict'

const matrix = require('sense-hat-led')
const messageResource = require('../resources/actions')
matrix.clear()
const senseLED = {}

senseLED.displayActionMessage = function (message) {
  messageResource.actionData.resources.ledMessage.data[0].message = message
  senseLED.display = displayInterval
}

var displayInterval = setInterval(() => {
  matrix.showMessage(messageResource.actionData.resources.ledMessage.data[0].message, 0.1, [0, 255, 100])
}, 20000)

module.exports = senseLED
