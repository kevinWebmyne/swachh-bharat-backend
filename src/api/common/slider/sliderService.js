const SliderRepository = require('./sliderRepository');
class SliderService {
  constructor() {
    this.repository = new SliderRepository();
  }

 // update a volunteer data
 update(data, id , file){
  //  console.log(file);
    return this.repository.findById(id)
    .then(u => {
      if (!u) {
        throw new Error('User already exists');
      }
      const newData = {
        title: data.title,
        description: data.description,
        image: file.originalname,
        status: data.status,
        is_verified: true
      };
      return this.repository.edit(id ,newData);
    })
  }

  list(page, size) {    
    return this.repository.getAllUsers(page, size);
  }

  register(data, file){ 
    const newData = {
   sliderTitle: data.sliderTitle,
   image: file.originalname,
   description: data.description,
   status: data.status
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

module.exports = SliderService;