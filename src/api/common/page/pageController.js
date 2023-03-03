const express = require('express');
const router = express.Router();
const  {body}  = require('express-validator');
const PageService = require('./pageService');
pageService = new PageService();

router.put('/:id', [
    body('pageTitle', 'Please enter valid  pageTitle').isString().notEmpty(),
    body('description', 'Please enter a description').isString().notEmpty(),
    body('status', 'Please enter valid  status').isString().notEmpty(),
], (req, res) => {
    const id = req.params.id;
    pageService
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
    body('pageTitle', 'Please enter valid  pageTitle').isString().notEmpty(),
    body('description', 'Please enter valid  description').isString().notEmpty(),
    body('status', 'Please enter valid  status').isString().notEmpty(),
    body('pageUrl', 'Please enter valid  pageUrl').isString().notEmpty()

   
], (req, res) => {
    pageService
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
 
    pageService
      .soft_delete(req.params.id)
      .then(user => res.status(200).send(" Data has been deleted ! "))
      .catch(err => res.status(400).send(
        {
          err: err.message
        }
      ));
  });



module.exports = router;