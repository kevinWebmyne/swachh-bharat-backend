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

  delete(id) {
    return this.repository.findById(id)
      .then(u => {
        if (!u) {
          throw new Error('User does not exists');
        }
        return this.repository.delete(id);
      })
  }


  // user email confirmation
  confirm_user(email, token) {
    return this.repository.confirm_user(email, token)
      .then(result => result);
  }

  // update a volunteer data
  update(data, file , id ) {
   
     
        const newData = {
          volunteerTitle: data.volunteerTitle,
          image: file.originalname,
          description: data.description,
          status: data.status,
        };

        // console.log(newData);
        return this.repository.edit(id, newData);
      
  }

  // soft Delete a volunteer data
  soft_delete(id) {
    return this.repository.soft_delete(id)
      .then(result => result);
  }

  addMany(users) {
    return this.repository.addMany(users);
  }



  register(data, file) {
    const newData = {
      volunteerTitle: data.volunteerTitle,
      image: file.originalname,
      description: data.description,
      status: data.status,
      created_at: new Date(),
      is_verified: true,
      updated_at: null,
      deleted_at: null
    };

    console.log(newData);
    // return newUser;
    return this.repository.add(newData);
  }


  
  soft_delete(id) {
    return this.repository.soft_delete(id)
   .then(result => result);
}


}

module.exports = VolunteerService;
