const ContactRepository = require('./contactRepository');

class ContactService {
  constructor() {
    this.repository = new ContactRepository();
  }

  contact(data){
    const newData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      is_verified: true
      };
      // return newUser;
      return this.repository.add(newData);
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }

  soft_delete(id) {
    return this.repository.soft_delete(id)
   .then(result => result);
}


}

module.exports = ContactService;