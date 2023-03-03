const express = require('express');
const router = express.Router();

const PledgeService = require('./pledgeService');
pledgeService = new PledgeService();


router.get('/', (req, res) => {
  let { page, size } = req.query;

  pledgeService.list(page, size)
    .then(pledges => res.status(200).send(
      {
        page,
        size,
        data: pledges
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
})

router.put('/delete/:id', (req, res, next) => {
 
  pledgeService
    .soft_delete(req.params.id)
    .then(user => res.status(200).send(" Data has been deleted ! "))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});



module.exports = router;