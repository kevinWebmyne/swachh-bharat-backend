const { ObjectID } = require('mongodb');
const getMongoDBClient = require('../db/mongodbClient');

class BaseRepository {
  constructor(collectionName) {
    this.dbClient = getMongoDBClient();
    this.collection = collectionName;
  }

  getCount() {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .countDocuments());
  }
  

  findById(id) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ _id: ObjectID(id) }));
  }

  add(item) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .insertOne(item));
  }

  addMany(items) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .insertMany(items));
  }

  edit(id, item) {
    const date = new Date();
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .updateOne({ _id: ObjectID(id) }, { $set: item   },  { $set: { updated_at: date } } , { upsert: false }));
  }

  delete(id) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .remove({ _id:ObjectID(id) }));
  }

  list() {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .find());
  }
}

module.exports = BaseRepository;
