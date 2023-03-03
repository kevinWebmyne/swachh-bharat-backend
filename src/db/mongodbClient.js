const mongoClient = require('mongodb').MongoClient;
const config = require('config');
let dbClient = null;

module.exports = function getMongoDBClient() {
  if (dbClient) {
    return dbClient;
  }
  console.log('Connecting to MongoDB client...');

  const { url, name } = config.get('db');
  dbClient = mongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
      console.log('MongoDB client has been successfully created');
      return client.db(name);
    })
    .catch(err => {
      console.log(`Error occurred while connecting to mongodb: ${err}`);
    });

  return dbClient;
};
