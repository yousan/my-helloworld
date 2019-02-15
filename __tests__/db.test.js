const db = require('../models/index');

describe('DataBase connection test', () => {
  it('connection test', () => {
    return db.sequelize
      .authenticate()
      .then(() => true)
      .catch(() => false);
  });
});
