module.exports = (table, seedData, tableName) => {
  seedData.forEach((data) => {
    table.create(data)
      .then(() => {
        console.log(`data successfully seeded for ${tableName}`);
      })
      .catch(err => console.log('error seeding data', err));
  });
};