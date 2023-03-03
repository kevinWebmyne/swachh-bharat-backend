const DonorRepository = require('./donorRepository');

class DonorService {
  constructor() {
    this.repository = new DonorRepository();
  }

  register(data, chargeId, chargeStatus) {
    const newdonor = {
      amount: data.amount,
      // description: data.description,
      name: data.name,
      emailAddress: data.emailAddress,
      phone: data.phone,
      panNumber: data.panNumber,
      streetAddress: data.streetAddress,
      addressLine2: data.addressLine2,
      state: data.state,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      transaction_id: chargeId,
      status: chargeStatus
    };
    // return newUser;

    console.log(newdonor);
    return this.repository.add(newdonor);
  }

  list(page, size) {
    return this.repository.getAllUsers(page, size);
  }


  update(id, transaction, status ) {
    return this.repository.update(id , transaction, status)
   .then(result => result);
}

}

module.exports = DonorService;