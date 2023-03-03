const express = require('express');
const router = express.Router();
const  {body}  = require('express-validator');
const StateService = require('./stateService');
stateService = new StateService();

router.put('/:id', [
    body('country', 'Please enter valid  country').isString().notEmpty(),
    body('stateTitle', 'Please enter a stateTitle').isString().notEmpty()
], (req, res) => {
    // console.log(req);
    const id = req.params.id;
    stateService
        .update(req.body, id)
        .then(() => res.status(200).send(
            {
                status: 200,
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
    body('country', 'Please enter valid  country').isString().notEmpty(),
    body('stateTitle', 'Please enter a stateTitle').isString().notEmpty()
], (req, res) => {
    stateService
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


router.put('/delete/:id', (req, res, next) => {
    // console.log(req);
    stateService
      .soft_delete(req.params.id)
      .then(user => res.status(200).send(" Data has been deleted ! "))
      .catch(err => res.status(400).send(
        {
          err: err.message
        }
      ));
  });



module.exports = router;