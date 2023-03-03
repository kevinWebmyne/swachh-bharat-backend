
const BaseRepository = require('../../../db/baseRepository');
const { ObjectID } = require('mongodb');
class ProgrammesRepository extends BaseRepository {

  constructor() {
    super('programmes');
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
              programme_place: { $first: "$programme_place" },
              description: { $first: "$description" },
              image : {$first:"$image"},
              why_this_place: { $first: "$why_this_place" },
              state: { $first: "$state" },
              city: { $first: "$city" },
              date : { $first: "$date"},
              volunteers: { $first: "$volunteers" },
              people_benefited: { $first: "$people_benefited" },
             status: { $first: "$status" },
              area_cover: { $first: "$area_cover" },
              is_verified: {$first:"$is_verified"}
            }
          },
          
          { $sort: { name: 1 }}
        ])
        .skip(skip)
        .limit(limit)
        .toArray()
      )     
      
      .then(data => {
       return data;
      });
  }


  soft_delete(id) {
    const date = new Date();
        if (id) {
          return this.dbClient
            .then(db => db
              .collection(this.collection)
              .updateOne({ _id: ObjectID(id) },
                { $set: { is_verified: false ,  updated_at: date , deleted_at: date } })
            )
        } else {
          return 'Invalid user';
        }
     
  }

  
}

module.exports = ProgrammesRepository;
