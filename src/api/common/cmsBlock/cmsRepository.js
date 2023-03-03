
const BaseRepository = require('../../../db/baseRepository');
const config = require('config');
const {file_path , domain } = config.get('uploads');
const {port} = config.get('api');


class CmsRepository extends BaseRepository {

  constructor() {
    super('cmsBlocks');
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
              title: { $first: "$title" },
              image:  { $first : "$image" },
              status: { $first: "$status" },
              identifier: {$first:"$identifier"},
              description: { $first: "$description" },
              file_path: {$first: `${file_path}`}
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

}

module.exports = CmsRepository;
