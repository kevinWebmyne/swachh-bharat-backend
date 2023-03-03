const crypto = require('crypto');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const VolunteerRepository = require('./volunteerRepository');
const emailService = require('../../../utils/emailService');

class VolunteerService {
  constructor() {
    this.repository = new VolunteerRepository();
  }

  // get all users
  list(page, size) {
    return this.repository.getAllUsers(page, size);
  }

  //get count
  getCount() {
    return this.repository.getCount();
  }

  // get user by email
  findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  // get user by id
  findById(id) {
    return this.repository.findById(id)
      .then(user => user);
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

   // register user
   register(data) {
    return this.repository.findByEmail(data.email)
      .then(u => {
        if (u) {
          throw new Error('User already exists');
        }

        const newData = {
          name: data.name,
          city: data.city,
          state: data.state,
          mobile: data.mobile,
          email: data.email,
          message: data.message,          
          is_verified: true,
          created_at: new Date(),
          updated_at: null,
          deleted_at: null         
        };
        // return newUser;
        return this.repository.add(newData);
      })
      .then(() => {
        return 
        
      });
  }

   // user email confirmation
  confirm_user(email, token) {
    return this.repository.confirm_user(email, token)
      .then(result => result);
  }

// update a volunteer data
  update(data, id){
    return this.repository.findById(id)
    .then(u => {
      if (!u) {
        throw new Error('User already exists');
      }
      const newData = {
        name: data.name,
        email: data.email,
        city: data.city,
        state: data.state,
        mobile: data.mobile,
        message: data.message
      };
      return this.repository.edit(id ,newData);
    })
  }

  // soft Delete a volunteer data
  soft_delete(id) {
       return this.repository.soft_delete(id)
      .then(result => result);
  }
  
  addMany(users) {
    return this.repository.addMany(users);
  }
}

module.exports = VolunteerService;
