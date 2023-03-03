const { ObjectId } = require('mongodb');
const BaseRepository = require('../../../db/baseRepository');
class UserRepository extends BaseRepository {
  constructor() {
    super('volunteersData');
  }

  

// soft delete a volunteer
  soft_delete(id) {
    const date = new Date();
        if (id) {
          return this.dbClient
            .then(db => db
              .collection(this.collection)
              .updateOne({ _id: ObjectId(id) },
                { $set: { is_verified: false ,  updated_at: date , deleted_at: date } })
            )
        } else {
          return 'Invalid user';
        }
     
  }

  // get all users
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
              volunteerTitle: { $first: "$volunteerTitle" },
              image: { $first: "$image" },
              description: { $first: "$description" },
              status: { $first: "$status" },
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

  // get user by email
  findByEmail(email) {
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .findOne({ email }));
  }

}

module.exports = UserRepository;
