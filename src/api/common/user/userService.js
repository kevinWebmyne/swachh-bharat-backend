const UserRepository = require('./userRepository');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }


  //get count
  getCount() {
    return this.repository.getCount();
  }

   // get user by email
   findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  // register user
  register(data) {
      return this.repository.findByEmail(data.email)
        .then(u => {
          if (u) {
            throw new Error('User already exists');
          }
  
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(data.password, salt);
          const newData = {
            name: data.name,
            email: data.email,          
          role : data.role,
            password : passwordHash,
      is_verified: true, 
            created_at: new Date(),
            updated_at: null,
            deleted_at: null         
          };
          // return newUser;
          return this.repository.add(newData);
        })
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }

  // update a volunteer data
  update(data, id){
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(data.password, salt);
        const newData = {
          name: data.name,
          email: data.email, 
          role : data.role,         
          password : passwordHash, 

        };
      return this.repository.edit(id ,newData);
  }

  // soft Delete a volunteer data
  soft_delete(id) {
       return this.repository.soft_delete(id)
      .then(result => result);
  }

  // delete(id){
  //   return this.repository.findById(id)
  //   .then(u => {
  //     if (!u) {
  //       throw new Error('User does not exists');
  //     }
  //     return this.repository.delete(id);
  //   })
  // }
  addMany(users) {
    return this.repository.addMany(users);
  }



   
 findById(id) {
  return this.repository.findById(id)
    .then(user => user);
}

}

module.exports = UserService;
