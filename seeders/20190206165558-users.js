'use strict';

const csvParser = require('csv-parse');
const fs = require('fs');
const path = require('path');

const readPromise = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err !== null) reject(err);
      else resolve(data.toString());
    });
  });
};

const parsePromise = data => {
  return new Promise((resolve, reject) => {
    csvParser(data, { columns: true }, (err, record) => {
      if (err !== undefined) reject(err);
      else resolve(record);
    });
  });
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csvPath = path.join(__dirname, path.basename(__filename).replace('.js', '.csv'));
    try {
      const record = await readPromise(csvPath).then(x => parsePromise(x));
      return queryInterface.bulkInsert('Users', record, {});
    } catch (e) {
      console.log(e);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
