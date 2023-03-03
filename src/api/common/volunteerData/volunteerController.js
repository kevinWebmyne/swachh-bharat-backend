const express = require('express');
const router = express.Router();
const multer = require("multer");
const config = require('config');

const {file_path , domain } = config.get('uploads');
const  {body}  = require('express-validator');
const VolunteerService = require('./volunteerService');
const volunteerService = new VolunteerService();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, file_path);
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

let fileFilter = function (req, file, cb) {
  var allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png'];
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



//#region current
router.get('/current/:id',  (req, res) => {
  volunteerService
    .findById(req.params.id)
    .then(user =>
      res.status(200).send(
        {
          data: user
        }
      ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});
//#endregion

router.put('/:id', upload.single('image'), [
  body('volunteerTitle', 'Please enter valid sliderTitle').isString().notEmpty(),
  body('description', 'Please enter valid description').isString().notEmpty(),
  body('image', 'please select a image').isString().notEmpty(),
  body('status', 'Please enter valid  status').isString().notEmpty()
], (req, res) => {
  console.log(req.file );
  const vol_id = req.params.id;
  volunteerService
    .update(req.body, req.file, vol_id)
    .then(() => res.status(200).send(
      {
        data: "Your profile has been updated ."
      }
    ))
    .catch(err => res.status(400).send(
      {
        err_msg: err.message
      }
    ));
});

router.put('/delete/:id', (req, res, next) => {

  const id = req.params.id;

  volunteerService
    .soft_delete(id)
    .then(volunteers => res.status(200).send(" Data has been deleted ! "))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});

// router.delete('/:id', (req, res, next) => {
//   const id = req.params.id;
//   volunteerService
//     .delete(id)
//     .then(user =>
//       res.status(200).send("Data has been delete Successful"))
//     .catch(err => res.status(400).send(
//       {
//         err: err.message
//       }
//     ));
// });

router.post('/register', upload.single('image'), [
  body('volunteerTitle', 'Please enter valid sliderTitle').isString().notEmpty(),
  body('description', 'Please enter valid description').isString().notEmpty(),
  body('image', 'please select a image').isString().notEmpty(),
  body('status', 'Please enter valid  status').isString().notEmpty()
], (req, res) => {
  console.log(req.body , req.file);
  volunteerService
      .register(req.body, req.file)
      .then((data) => res.status(200).send(
          {
              data: "Your profilees has been created ."
          }
      ))
      .catch(err => res.status(400).send(
          {
              err_msg: err.message
          }
      ));
});




module.exports = router;