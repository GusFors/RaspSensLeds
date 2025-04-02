'use strict'

const rootController = {}

rootController.getRoot = async (req, res, next) => {
  try {
    const resData = {
      id: 'https://25331e5e.ngrok.io',
      name: 'My WoT Raspberry PI sensor and LED station',
      description: 'A simple WoT-connected Raspberry Pi providing sensor data and LED message for the WoT and course 1dv527',
      tags: ['raspberry', 'pi', 'WoT', 'SenseHAT'],
      links: {
        properties: {
          link: '/properties',
          title: 'List of properties',
        },
        actions: {
          link: '/actions',
          title: 'Actions of this thing',
        },
        type: {
          link: 'http://model.webofthings.io/',
          title: 'Instance type of this PI',
        },
        ui: {
          link: '/',
          title: 'User interface',
        },
        model: {
          link: '/model',
          title: 'Full model of this thing (JSON)',
        },
      },
      customFields: { port: 9000 },
    }

    res.links({
      model: '/model/',
      properties: '/properties/',
      actions: '/actions/',
      things: '/things/',
      type: 'http://model.webofthings.io/',
      ui: '/properties',
    })

    if (req.accepts('html')) {
      res.render('root/home', { req: req, resData })
    } else {
      res.status(200).json([resData])
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

module.exports = rootController
