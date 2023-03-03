const CmsRepository = require('./cmsRepository');
class CmsService {
  constructor() {
    this.repository = new CmsRepository();
  }

 // update a volunteer data
 update(data, id , file){

    return this.repository.findById(id)
    .then(u => {
      if (!u) {
        throw new Error('User already exists');
      }
      const newData = {
        title: data.title,
        identifier : data.identifier,
        description: data.description,
        image: file.originalname,
        status: data.status
      };
      return this.repository.edit(id ,newData);
    })
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }


  findById(id) {
    return this.repository.findById(id)
      .then(user => user);
  }


}

module.exports = CmsService;