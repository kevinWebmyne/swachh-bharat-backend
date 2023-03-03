const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
var path = require('path');
const app = express();
const { port, root } = config.get('api');

//#region define a paths for routes 
const auth = require('./auth');
const noAuthController = require('./api/common/noAuth/noAuthController')
const volunteersController = require('../src/api/common/volunteer/volunteerController');

const volunteersDataController = require('../src/api/common/volunteerData/volunteerController');
const usersController = require('../src/api/common/user/userController');
const ProgrammesController = require('../src/api/common/programmes/programmesController');
const pledgeController = require('../src/api/common/pledge/pledgeController');
const contactController = require("../src/api/common/contact/contactController");
const cmsController= require('../src/api/common/cmsBlock/cmsController');
const impactController = require('../src/api/common/ourImpact/impactController')
const pageController = require('../src/api/common/page/pageController')
const countryController = require('../src/api/common/country/countryController')
const languageController = require('../src/api/common/language/languageController')
const stateController = require('../src/api/common/state/stateController')
const sliderController = require('../src/api/common/slider/sliderController')
const donorController = require('../src/api/common/donor/donorController')

//#endregion

//#region seeder 
const SeedService = require('../src/api/seedService');
const seedService = new SeedService();
seedService.checkAndSeed();
//#endregion

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));





//#region define a endpoints 
app.use(`${root}/noAuth`, noAuthController);
app.use(`${root}/volunteers`, auth, volunteersController);
app.use(`${root}/programmes`, auth, ProgrammesController);
app.use(`${root}/pledge`, auth, pledgeController)
app.use(`${root}/users`, auth,  usersController);
app.use(`${root}/contact`, auth, contactController);
app.use(`${root}/cms`,auth ,cmsController);
app.use(`${root}/impact`, auth, impactController);
app.use(`${root}/page`, auth, pageController);
app.use(`${root}/country`, auth, countryController);
app.use(`${root}/language`,auth,  languageController);
app.use(`${root}/state`,auth, stateController);
app.use(`${root}/slider`,auth, sliderController);
app.use(`${root}/donor`, auth , donorController);
app.use(`${root}/volunteersData`,auth , volunteersDataController);
 //#endregion

var http = require('http').Server(app);
http.listen(`${port}`, () => {
});
console.log(`Server start listening port: ${port}`);