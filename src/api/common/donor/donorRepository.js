const { ObjectId } = require('mongodb');
const BaseRepository = require('../../../db/baseRepository');

class DonorRepository extends BaseRepository {

  constructor() {
    super('donors');
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
              name: { $first: "$name" },
              emailAddress: { $first: "$emailAddress" },
              phone: { $first: "$phone" },
              amount: { $first: "$amount" },
              transaction_id: { $first: "$transaction_id" },
              status: { $first: "$status" }
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

  update(id, transaction, status ) {
    const date = new Date();
        if (id) {
          return this.dbClient
            .then(db => db
              .collection(this.collection)
              .updateOne({ _id: ObjectId(id) },
                { $set: { transaction_id : transaction , status : status,  updated_at: date  } })
            )
        } else {
          return 'Invalid user';
        }
     
  }


}

module.exports = DonorRepository;
