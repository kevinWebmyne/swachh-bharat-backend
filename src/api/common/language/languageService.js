const LanguageRepository = require('./languageRepository');
class LanguageService {
  constructor() {
    this.repository = new LanguageRepository();
  }

 // update a Language
 update(data, id ){
 
    return this.repository.findById(id)
    .then(u => {
      if (!u) {
        throw new Error('User already exists');
      } 
      const newData = {
        languageCode: data.languageCode,
      languageName: data.languageName,
      status: data.status
      };
      return this.repository.edit(id ,newData);
    })
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }

  register(data){ 
     const newData = {
      languageCode: data.languageCode,
      languageName: data.languageName,
      status: data.status
  };
  console.log(data);
    // return newUser;
    return this.repository.add(newData);
  
  }

    // get user by id
    findById(id) {
      return this.repository.findById(id)
        .then(user => user);
    }
  


}

module.exports = LanguageService;