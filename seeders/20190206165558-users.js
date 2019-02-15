const csv = require('../csv');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const record = await csv();
    return queryInterface.bulkInsert('Users', record, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
