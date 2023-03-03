const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ProgrammesService = require('./programmesService');
programmesService = new ProgrammesService();
const config = require('config');
const {file_path , domain } = config.get('uploads');
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, file_path);
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

let fileFilter = function (req, file, cb) {
  var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb({
          success: false,
          message: 'Invalid file type. Only jpg, png image files are allowed.'
      }, false);
  }
};

const upload = multer({
  storage: storage,limits: {
      fileSize: 2 * 1024 * 1024},
  fileFilter: fileFilter,

})


router.post('/', upload.single('image'), [
  body('programme_place', 'Please enter valid  Programme_Place').isString().notEmpty(),
  body('description', 'Please enter valid Description').isString().notEmpty(),
  body('why_this_place', 'Please enter valid Description').isString().notEmpty(),
  body('state', 'Please enter valid  state').isString().notEmpty(),
  body('city', 'Please enter valid  City').isString().notEmpty(),
  body('volunteers', 'Please enter valid  Volunteers').isInt().notEmpty(),
  body('image', 'Please enter valid  Image').isString().notEmpty(),
  body('people_benefited', 'Please enter valid  People Benefited').isInt().notEmpty(),
  body('area_cover', 'Please enter valid  Area Cover(in KM )').isInt().notEmpty(),
  body('youths_trained', 'Please enter valid  Youths Trained').isInt().notEmpty(),
  body('status', 'Please enter valid  Youths Trained').isString(['active', 'inactive']).notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array();
    res.status(422).send(
      {
        status: 422,
        err_msg: err_array[0].msg
      });
  } else {
    programmesService
      .programmes(req.body , req.file)
      .then(() => res.status(200).send(
        {
          data: "Your Programmes is created successfully."
        }
      ))
      .catch(err => res.status(400).send(
        {
          err_msg: err.message
        }
      ));
  }
});



router.get('/:id', (req,res) => {
  programmesService.findById(req.params.id)
  .then(user => res.send(
    {
      status: 200,
      data: user
    }
  ))
  .catch(err => res.status(400).send(
    {
      status: 400,
      err: err.message
    }
  ));

})

router.put('/:id', upload.single('image'), [
  body('programme_place', 'Please enter valid  Programme_Place').isString().notEmpty(),
  body('description', 'Please enter valid Description').isString().notEmpty(),
  body('why_this_place', 'Please enter valid Description').isString().notEmpty(),
  body('state', 'Please enter valid  state').isString().notEmpty(),
  body('city', 'Please enter valid  City').isString().notEmpty(),
  body('volunteers', 'Please enter valid  Volunteers').isInt().notEmpty(),
  body('people_benefited', 'Please enter valid  People Benefited').isInt().notEmpty(),
  body('area_cover', 'Please enter valid  Area Cover(in KM )').isInt().notEmpty(),
  body('youths_trained', 'Please enter valid  Youths Trained').isInt().notEmpty(),
  body('status', 'Please enter valid  Youths Trained').isString(['active', 'inactive']).notEmpty(),
], (req, res) => {

  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array();
    res.status(422).send(
      {
        status: 422,
        err_msg: err_array[0].msg
      });
  } else {
    console.log(req.file);
    programmesService
      .update(req.body ,id  ,  req.file)
      .then(() => res.status(200).send(
        {
          data: "Your Programmes is created successfully."
        }
      ))
      .catch(err => res.status(400).send(
        {
          err_msg: err.message
        }
      ));
  }
});


router.put('/delete/:id', (req, res, next) => {
 
  programmesService
    .soft_delete(req.params.id)
    .then(user => res.status(200).send(" Data has been deleted ! "))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});

module.exports = router;