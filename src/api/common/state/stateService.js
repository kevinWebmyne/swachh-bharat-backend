const StateRepository = require('./stateRepository');
class StateService {
  constructor() {
    this.repository = new StateRepository();
  }

  // update a state
  update(data, id) {
    //  console.log(file);
    return this.repository.findById(id)
      .then(u => {
        if (!u) {
          throw new Error('User already exists');
        }
        const newData = {
          country: data.country,
          stateTitle: data.stateTitle
        };
        return this.repository.edit(id, newData);
      })
  }

  list(page, size) {
    return this.repository.getAllUsers(page, size);
  }

  register(data) {
    const newData = {
      country: data.country,
      stateTitle: data.stateTitle,
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

module.exports = StateService;