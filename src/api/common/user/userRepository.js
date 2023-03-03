const BaseRepository = require('../../../db/baseRepository');
const { ObjectID } = require('mongodb');
class UserRepository extends BaseRepository {

  constructor() {
    super('users');
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
              name: { $first: "$name" },
              email: { $first: "$email" },
              role: {$first: "$role"},
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

  // // soft delete a volunteer
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

module.exports = UserRepository;
