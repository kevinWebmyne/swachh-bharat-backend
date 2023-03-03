const express = require('express');
const router = express.Router();
const VolunteerService = require('../volunteer/volunteerService');
const volunteerService = new VolunteerService();


//#region current
// router.get('/current',  (req, res) => {
//   volunteerService
//     .findById(req.user.id)
//     .then(user =>
//       res.status(200).send(
//         {
//           data: user
//         }
//       ))
//     .catch(err => res.status(400).send(
//       {
//         err: err.message
//       }
//     ));
// });
//#endregion

router.put('/:id', (req, res) => {
  const vol_id = req.params.id;
  volunteerService
    .update(req.body, vol_id)
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

module.exports = router;