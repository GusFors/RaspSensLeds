'use strict'

const senseLED = require('../plugins/SenseLED.js')
const actionResource = require('../resources/actions')

const actionController = {}

actionController.getActions = async (req, res, next) => {
  try {
    const resData = actionResource.actionData

    res.links({ type: 'http://model.webofthings.io/#actions-resource', ledmessage: '/ledmessage' })

    if (req.accepts('html')) {
      res.render('actions/actions', { req: req, resData })
    } else {
      res.status(200).json([
        {
          id: 'ledMessage',
          name: 'Change LED message',
          links: {
            title: 'Change LED message',
            link: '/actions/ledmessage',
          },
        },
      ])
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

actionController.postLedMessage = async (req, res, next) => {
  try {
    if (req.body.message) {
      senseLED.displayActionMessage(req.body.message)
      res.status(204).json()
    } else {
      res.status(400).json({ message: 'Bad request' })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

actionController.getLedMessage = async (req, res, next) => {
  try {
    const resData = actionResource.actionData.resources.ledMessage
    res.links({ type: 'http://model.webofthings.io/#actions-resource' })

    if (req.accepts('html')) {
      res.render('actions/ledmessage', { req: req, resData })
    } else {
      res.status(200).json([])
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

module.exports = actionController
