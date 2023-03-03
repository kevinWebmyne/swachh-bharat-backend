const CountryRepository = require('./countryRepository');
class CountryService {
  constructor() {
    this.repository = new CountryRepository();
  }

 // update a country
 update(data, id ){

    return this.repository.findById(id)
    .then(u => {
      if (!u) {
        throw new Error('User already exists');
      } 
      const newUser = {
        countryTitle: data.countryTitle,
        isdnCode: data.isdnCode
      };
      return this.repository.edit(id ,newUser);
    })
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }

  register(data){ 
     const newData = {
      countryTitle: data.countryTitle,
      isdnCode: data.isdnCode,
      is_verified: true
  };
    // return newUser;
    return this.repository.add(newData);
  
  }
  
    // get user by id
    findById(id) {
      return this.repository.findById(id)
        .then(user => user);
    }

    soft_delete(id) {
      return this.repository.soft_delete(id)
     .then(result => result);
 }

}

module.exports = CountryService;