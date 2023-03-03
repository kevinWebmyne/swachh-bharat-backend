const BaseRepository = require('../../../db/baseRepository');

class LanguageRepository extends BaseRepository {

  constructor() {
    super('languages');
  }
  getAllUsers(page, size ) {
    const limit = parseInt(size);
    const skip = parseInt(page - 1) * size;
    return this.dbClient 
      .then(db => db
        .collection(this.collection)
        .aggregate([
          {

            $group:
            {
              _id: "$_id",
              languageCode: { $first: "$languageCode" },
              languageName: {$first: "$languageName"},
              status: {$first: "$status"}
              }
          },
          
          { $sort: { name: 1 }}
        ])  .skip(skip)
        .limit(limit)
        .toArray()
      )     
      
      .then(data => {
       return data;
      });
  }

}

module.exports = LanguageRepository;
