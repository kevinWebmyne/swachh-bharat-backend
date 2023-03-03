const PledgeRepository = require('./pledgeRepository');

class PledgeService {
  constructor() {
    this.repository = new PledgeRepository();
  }

  pledge(data){
    const newpledge = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      state: data.state,
      city: data.city,
      message: data.message,
      is_verified: true
      };
      // return newUser;
      return this.repository.add(newpledge);
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }


  soft_delete(id) {
    return this.repository.soft_delete(id)
   .then(result => result);
}

}

module.exports = PledgeService;