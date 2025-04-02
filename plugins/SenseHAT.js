'use strict'

const imu = require('node-sense-hat').Imu
const IMU = new imu.IMU()

const senseHat = {}

senseHat.readTemperature = () => {
  return IMU.getValueSync().temperature
}

senseHat.readTempAsync = (async) => {
  return new Promise((resolve) => {
    IMU.getValue((err, data) => {
      if (err !== null) {
        console.error('sensor data error: ', err)
      }
      resolve(data.temperature.toFixed(4))
    })
  })
}

senseHat.readHumidityAsync = (async) => {
  return new Promise((resolve) => {
    IMU.getValue((err, data) => {
      if (err !== null) {
        console.error('sensor data error: ', err)
      }

      resolve(data.humidity.toFixed(4))
    })
  })
}

senseHat.readPressureAsync = (async) => {
  return new Promise((resolve) => {
    IMU.getValue((err, data) => {
      if (err !== null) {
        console.error('sensor data error: ', err)
      }

      resolve(data.pressure.toFixed(4))
    })
  })
}

module.exports = senseHat
