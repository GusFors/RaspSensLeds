'use strict'

const sensor = require('../plugins/SenseHAT.js')
const sensorResource = require('../resources/sensors.js')
const messageResource = require('../resources/actions')

const propertiesController = {}

propertiesController.getProperties = async (req, res, next) => {
  try {
    const resData = [
      {
        id: 'temperature',
        name: 'Temperature Sensor',
        values: {
          t: await sensor.readTempAsync(),
          timestamp: new Date().toJSON(),
        },
      },
      {
        id: 'humidity',
        name: 'Humidity Sensor',
        values: {
          h: await sensor.readHumidityAsync(),
          timestamp: new Date().toJSON(),
        },
      },
      {
        id: 'pressure',
        name: 'Pressure Sensor',
        values: {
          p: await sensor.readPressureAsync(),
          timestamp: new Date().toJSON(),
        },
      },
      {
        id: 'ledmessage',
        name: 'LED message',
        values: {
          message: messageResource.actionData.resources.ledMessage.data[0].message,
          timestamp: new Date().toJSON(),
        },
      },
    ]

    res.links({
      type: 'http://properties.webofthings.io/#properties-resource',
      temperature: '/temperature',
      humidity: '/humidity',
      pressure: '/pressure',
      ledmessage: '/ledmessage',
    })

    if (req.accepts('html')) {
      res.render('properties/properties', { req: req, resData })
    } else {
      res.status(200).json(resData)
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

propertiesController.getTemperature = async (req, res, next) => {
  try {
    const resource = sensorResource.temperature
    const data = { t: await sensor.readTempAsync(), timestamp: new Date().toJSON() }
    const resData = [data]

    res.links({ type: 'http://properties.webofthings.io/#properties-resource' })

    if (req.accepts('html')) {
      res.render('properties/temperature', { req: req, resData, resource, data })
    } else {
      res.status(200).json(resData)
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

propertiesController.getHumidity = async (req, res, next) => {
  try {
    const resource = sensorResource.humidity
    const data = { h: await sensor.readHumidityAsync(), timestamp: new Date().toJSON() }
    const resData = [data]

    res.links({ type: 'http://properties.webofthings.io/#properties-resource' })

    if (req.accepts('html')) {
      res.render('properties/humidity', { req: req, resData, resource, data })
    } else {
      res.status(200).json(resData)
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

propertiesController.getPressure = async (req, res, next) => {
  try {
    const resource = sensorResource.pressure
    const data = { p: await sensor.readPressureAsync(), timestamp: new Date().toJSON() }
    const resData = [data]

    res.links({ type: 'http://properties.webofthings.io/#properties-resource' })

    if (req.accepts('html')) {
      res.render('properties/pressure', { req: req, resData, resource, data })
    } else {
      res.status(200).json(resData)
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

propertiesController.getLedmessage = async (req, res, next) => {
  try {
    console.log(messageResource.actionData.resources.ledMessage.data[0].message)
    const resource = messageResource.actionData.resources.ledMessage
    const data = { m: messageResource.actionData.resources.ledMessage.data[0].message, timestamp: new Date().toJSON() }
    const resData = [data]

    res.links({ type: 'http://properties.webofthings.io/#properties-resource' })

    if (req.accepts('html')) {
      res.render('properties/ledmessage', { req: req, resData, resource, data })
    } else {
      res.status(200).json(resData)
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}
module.exports = propertiesController
