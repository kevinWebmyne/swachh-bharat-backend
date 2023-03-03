const express = require('express');
const router = express.Router();
const  {body}  = require('express-validator');
const config = require('config');
const {file_path , domain } = config.get('uploads');
const {port} = config.get('api');
const multer = require("multer");
const path = require("path");
const CmsService = require('./cmsService');
cmsService = new CmsService();

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


router.put('/:id', upload.single('image'), [
    body('title', 'Please enter valid  name').isString().notEmpty(),
    body('identifier', 'Please enter valid  name').isString().notEmpty(),
    body('description', 'Please enter valid  name').isString().notEmpty(),
    body('status', 'Please enter valid  name').isString().notEmpty(),
    body('image', 'please select a image').isString().notEmpty()
], (req, res) => {
    const vol_id = req.params.id;
    cmsService
        .update(req.body, vol_id , req.file)
        .then(() => res.status(200).send(
            {
                data: "Your profile has been updated .", 
                filepath: `${domain}${port}/${req.file.originalname}`
            }
        ))
        .catch(err => res.status(400).send(
            {
                err_msg: err.message
            }
        ));
});



router.get('/:id', (req,res) => {
    cmsService.findById(req.params.id)
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

module.exports = router;