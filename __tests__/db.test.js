const db = require('../models/index');

describe("DataBase connection test", () => {
  it("connection test", () => {
    console.log(process.env.NODE_ENV);

    return db.sequelize.authenticate()
      .then(() => true)
      .catch(() => false);
  });

});
