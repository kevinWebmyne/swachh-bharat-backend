const ProgrammesRepository = require('./programmesRepository');

const date = require('date-and-time')
class ProgrammesService {
  constructor() {
    this.repository = new ProgrammesRepository();
  }

  programmes(data, file) {

    const now  =  new Date();

    const newprogrammes = {
      programme_place: data.programme_place,
      description: data.description,
      why_this_place: data.why_this_place,
      state: data.state,
      city: data.city,
      volunteers: data.volunteers,
      date:  date.format(now,'YYYY/MM/DD HH:mm:ss'),
      image: file.originalname,
      people_benefited: data.people_benefited,
      youths_trained: data.youths_trained,
      status: data.status,
      area_cover: data.area_cover,
      is_verified: true
    };
    // return newUser;
    console.log(newprogrammes);
    return this.repository.add(newprogrammes);
  }

  list(page, size) {

    return this.repository.getAllUsers(page, size);
  }


  findById(id) {
    return this.repository.findById(id)
      .then(user => user);
  }


  update(data, id , file){
    //  console.log(file);
    
        const newData = {
          programme_place: data.programme_place,
          description: data.description,
          why_this_place: data.why_this_place,
          state: data.state,
          city: data.city,
          volunteers: data.volunteers,
          image: file.originalname,
          people_benefited: data.people_benefited,
          youths_trained: data.youths_trained,
          status: data.status,
          area_cover: data.area_cover
        };
        return this.repository.edit(id ,newData);
      
    }


    soft_delete(id) {
      return this.repository.soft_delete(id)
     .then(result => result);
 }
 

}

module.exports = ProgrammesService;