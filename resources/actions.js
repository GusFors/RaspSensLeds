// change message here for default one

var Actions = {
  actionData: {
    link: '/actions',
    title: 'Actions of this Web Thing',
    resources: {
      ledMessage: {
        id: 'ledmessage',
        name: 'Change LED message',
        description: 'Change the message of an LED',
        values: {
          message: {
            name: 'LED message',
            type: 'string',
            required: true,
          },
        },
        tags: ['LED', 'public', 'message'],
        data: [{ message: '' }],
      },
    },
  },
}

module.exports = Actions
