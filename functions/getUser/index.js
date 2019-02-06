'use strict';

const db = require('../../models/index');

module.exports.handler = (event, context, callback) => {
  db.User.findOne({
    where: {
      lastName: 'shuji'
    }
  }).then(user => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        user: user,
        input: event,
      }),
    };
    callback(null, response);
  });
};
