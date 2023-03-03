const { ObjectId } = require('mongodb');
const BaseRepository = require('../../../db/baseRepository');
class UserRepository extends BaseRepository {
  constructor() {
    super('volunteers');
  }

  // user email confirmation
  confirm_user(email, token) {
    const date = new Date();
    return this.dbClient
      .then(db => db
        .collection(this.collection)
        .aggregate([
          { $match: { email: email, verification_token: token } },
          { $sort: { name: -1 } }
        ])
        .toArray()
      )
      .then(data => {
        if (data.length > 0) {
          return this.dbClient
            .then(db => db
              .collection(this.collection)
              .updateOne({ _id: data[0]._id },
                { $set: { is_verified: true, updated_at: date } })
            )
            .then(() => { return 'Your email has been verified successfully!.'; });
        } else {
          return 'Invalid user';
        }
      });
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
              name: { $first: "$name" },
              dob: { $first: "$dob" },
              gender: { $first: "$gender" },
              city: { $first: "$city" },
              state: { $first: "$state" },
              mobile: { $first: "$mobile" },
              pledge: { $first: "$pledge" },
              email: { $first: "$email" },
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
