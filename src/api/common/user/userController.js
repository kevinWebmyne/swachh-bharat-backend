const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserService = require('./userService');
userService = new UserService();


  router.post('/', [
    body('name', 'Please enter valid  name').isString().notEmpty(),
    body('email', 'Please enter valid email').trim().isEmail(),
    body('role', 'Please enter valid role').trim().notEmpty(),
    body('password', 'Please enter valid password(Min. 6 characters.)').isString().trim().isLength({ min: 6 }),
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
  
      userService
        .register(req.body)
        .then(() => res.status(200).send(
          {
            data: "You have been registered successfully!."
          }
  
        ))
        .catch(err => res.status(400).send(
          {
            err_msg: err.message
          }
        ));
  
  
    }
  });

  router.get('/', (req, res) => {
    let { page, size } = req.query;
  
    userService.list(page, size)
      .then(user => res.status(200).send(
        {
          page,
          size,
          data: user
        }
      ))
      .catch(err => res.status(400).send(
        {
          err: err.message
        }
      ));
  })
 
  

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    userService
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


      router.get('/:id', (req,res) => {
        userService.findById(req.params.id)
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


    });

  //#region 
  router.put('/delete/:id', (req, res, next) => {
  
    const user_id = req.params.id;
  
    userService
      .soft_delete(user_id)
      .then(user => res.status(200).send(" Data has been deleted ! "))
      .catch(err => res.status(400).send(
        {
          err: err.message
        }
      ));
  });
  
  // router.delete('/:id', (req, res, next) => {
  //   const user_id = req.params.id;
  //   userService
  //     .delete(user_id)
  //     .then(user =>
  //       res.status(200).send("Data has been delete Successful"))
  //     .catch(err => res.status(400).send(
  //       {
  //         err: err.message
  //       }
  //     ));
  // });
//#endregion




router.get('/:id', (req,res) => {
  userService.findById(req.params.id)
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