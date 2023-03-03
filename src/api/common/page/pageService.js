const PageRepository = require('./pageRepository');
class PageService {
  constructor() {
    this.repository = new PageRepository();
  }

 // update a volunteer data
 update(data, id ){
  //  console.log(file);
    return this.repository.findById(id)
    .then(u => {
      if (!u) {
        throw new Error('User already exists');
      } 
      const newData = {
        pageTitle: data.pageTitle,
        description: data.description,
        status: data.status,
      };
      return this.repository.edit(id ,newData);
    })
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }

  register(data){ 
     const newData = {
      pageTitle: data.pageTitle,
      description: data.description,
      status: data.status,
      pageUrl: data.pageUrl,
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

module.exports = PageService;