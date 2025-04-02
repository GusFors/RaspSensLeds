'use strict'

const sensorResource = require('../resources/sensors.js')
const actionResource = require('../resources/actions.js')

const modelController = {}

modelController.getModel = async (req, res, next) => {
  try {
    res.links({ type: 'http://model.webofthings.io' })

    res.status(200).json({
      id: 'https://25331e5e.ngrok.io',
      name: 'My WoT Raspberry PI sensor and LED station',
      description: 'A simple WoT-connected Raspberry Pi providing sensor data and LED message for the WoT and course 1dv527',
      tags: ['raspberry', 'pi', 'WoT', 'SenseHAT'],
      customFields: {
        port: 9000,
      },
      links: {
        product: {
          link: 'https://www.raspberrypi.org/products/raspberry-pi-4-model-b/',
          title: 'Product this Web Thing is based on',
        },
        properties: {
          link: '/properties',
          title: 'List of Properties',
          resources: sensorResource,
        },
        actions: actionResource,
        type: {
          link: 'http://model.webofthings.io/',
          title: 'Instance type of the Pi',
        },
        help: {
          link: '/',
          title: 'Documentation',
        },
        ui: {
          link: '/properties',
          title: 'User Interface',
        },
      },
    })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

module.exports = modelController
