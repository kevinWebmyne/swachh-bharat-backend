const express = require('express');
const router = express.Router();

const ContactService = require('./contactService');
contactService = new ContactService();

router.get('/', (req, res) => {
    let { page, size } = req.query;
  
    contactService.list(page, size)
      .then(contact => res.status(200).send(
        {
          page,
          size,
          data: contact
        }
      ))
      .catch(err => res.status(400).send(
        {
          err: err.message
        }
      ));
  })


  router.put('/delete/:id', (req, res, next) => {
 
    contactService
      .soft_delete(req.params.id)
      .then(user => res.status(200).send(" Data has been deleted ! "))
      .catch(err => res.status(400).send(
        {
          err: err.message
        }
      ));
  });



module.exports = router;