'use strict'

module.exports = {
  temperature: {
    name: 'Temperature Sensor',
    description: 'A temperature sensor.',
    values: {
      t: {
        name: 'Temperature sensor',
        description: 'The temperature in celsius',
        unit: 'celsius',
      },
    },
    tags: ['sensor', 'public', 'indoors'],
  },
  humidity: {
    name: 'Humidity Sensor',
    description: 'A humidity sensor.',
    values: {
      h: {
        name: 'Humidity',
        description: 'Percentage of Humidity',
        unit: 'percent',
      },
    },
    tags: ['sensor', 'public', 'indoor'],
  },
  pressure: {
    name: 'Pressure Sensor',
    description: 'A pressure sensor.',
    values: {
      p: {
        name: 'Pressure',
        description: 'The pressure in millibars',
        unit: 'millibar',
      },
    },
    tags: ['sensor', 'public', 'indoor'],
  },
}
