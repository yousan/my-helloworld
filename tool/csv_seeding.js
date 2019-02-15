const path = require('path');
const fs = require('fs');
const sequalize = require('../models/index');
const csv = require('./csv');

// 指定したディレクトリに入っているcsvファイルを列挙
const getCSVFileName = dir => {
  return fs.readdirSync(dir).filter(x => x.slice(-4) === '.csv');
};

// ファイル名からテーブル名をパースする
// フォーマットは `YYYYMMDD-TABLENAME.csv`
const parseTableName = fileName => {
  const tableName = fileName.slice(0, fileName.length - 4).split('-')[1];
  return tableName;
};

// シーディングする
const seeding = (tableName, record) => {
  return queryInterface => {
    return queryInterface.bulkInsert(tableName, record, {});
  };
};

const main = async () => {
  const dir =
    process.argv.length >= 3
      ? process.argv[2]
      : path.join(__dirname, '../seeders');

  const fileNames = getCSVFileName(dir);

  const csvDatas = await fileNames.map(x => path.join(dir, x)).map(x => csv(x));
  const tableNames = fileNames.map(x => parseTableName(x));

  Promise.all(
    csvDatas
      .map((x, i) => [tableNames[i], x])
      .map(([tableName, record]) => seeding(tableName, record))
      .map(func =>
        func(sequalize.sequelize.getQueryInterface(), sequalize.Sequelize)
      )
  ).then(() => process.exit(0));
};

main();
