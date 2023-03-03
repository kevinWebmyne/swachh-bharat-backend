const express = require('express');
const router = express.Router();
const  {body}  = require('express-validator');
const CountryService = require('./countryService');
countryService = new CountryService();

router.put('/:id', [
    body('countryTitle', 'Please enter valid  countryTitle').isString().notEmpty(),
    body('isdnCode', 'Please enter a isdnCode').isInt().notEmpty()
], (req, res) => {
    const id = req.params.id;
    countryService
        .update(req.body, id)
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



router.post('/', [
    body('countryTitle', 'Please enter valid  countryTitle').isString().notEmpty(),
    body('isdnCode', 'Please enter valid isdnCode').isInt().notEmpty(),
], (req, res) => {
    countryService
        .register(req.body)
        .then(() => res.status(200).send(
            {
                data: "Your profile has been created ."
            }
        ))
        .catch(err => res.status(400).send(
            {
                err_msg: err.message
            }
        ));
});

router.get('/:id', (req,res) => {
    const country_id = req.params.id;
    countryService.findById(country_id)
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


  router.put('/delete/:id', (req, res, next) => {
 
    countryService
      .soft_delete(req.params.id)
      .then(user => res.status(200).send(" Data has been deleted ! "))
      .catch(err => res.status(400).send(
        {
          err: err.message
        }
      ));
  });



module.exports = router;