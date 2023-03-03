const ImpactRepository = require('./impactRepository');
class ImpactService {
  constructor() {
    this.repository = new ImpactRepository();
  }

 // update a volunteer data
 update(data, id , file){
  //  console.log(file);
    return this.repository.findById(id)
    .then(u => {
      if (!u) {
        throw new Error('User already exists');
      } 
      const newData = {
        title: data.title,
        image: file.originalname,
        status: data.status
      };
      return this.repository.edit(id ,newData);
    })
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }

  register(data, file){ 
     const newData = {
    title: data.title,
    image: file.originalname,
    status: data.status,
    is_verified: true
  };
    // return newUser;
    return this.repository.add(newData);
  
  }
  

  findById(id) {
    return this.repository.findById(id)
      .then(user => user);
  }


  soft_delete(id) {
    return this.repository.soft_delete(id)
   .then(result => result);
}


}

module.exports = ImpactService;