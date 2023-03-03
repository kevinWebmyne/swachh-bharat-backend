const UserService = require("./common/user/userService");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
userService = new UserService();

var usersToAdd = [];

class SeedService {
  checkAndSeed() {
    userService.getCount().then((count) => {
      // console.log(count);
      if (!count) {
        this.seedUsers().then();
      }
    });
  }

  // seed
  async seedUsers() {
    try {
      console.log("Seed Data");
      await this.addRandomUsers(this.getNames());
      console.log("Seed Users Done");
    } catch (err) {
      console.log(err);
    }
  }

  // add
  addRandomUsers(names) {
    for (let i = 0; i < 1; i++) {
      const passwordHash = bcrypt.hashSync("admin", 10);
      const first_name = names;
      const newUser = {
        _id: ObjectId(),
        email: `${first_name}@gmail.com`,
        password: passwordHash,
        created_at: new Date(),
      };
      usersToAdd.push(newUser);
    }
    return userService.addMany(usersToAdd);
  }

  // // data
  getNames() {
    return ["Admin"];
  }
}

module.exports = SeedService;
