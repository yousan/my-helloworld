const csv = require('../tool/csv');

module.exports = {
  up: async queryInterface => {
    const record = await csv();
    return queryInterface.bulkInsert('Users', record, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
