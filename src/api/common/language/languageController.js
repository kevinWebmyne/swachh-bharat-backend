const express = require('express');
const router = express.Router();
const  {body}  = require('express-validator');
const LanguageService = require('./languageService');
languageService = new LanguageService();

router.put('/:id', [
    body('languageCode', 'Please enter valid languageCode').isString().notEmpty(),
    body('languageName', 'Please enter a languageName').isString().notEmpty(),
    body('status', 'Please enter a valid status').isString().notEmpty()
], (req, res) => {
    const id = req.params.id;
    languageService
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

router.get('/', (req, res) => {
    let { page, size } = req.query;

    languageService.list(page, size)
        .then(language => res.status(200).send(
            {
                page,
                size,
                data: language
            }
        ))
        .catch(err => res.status(400).send(
            {
                err: err.message
            }
        ));
})

router.post('/', [
    body('languageCode', 'Please enter valid languageCode').isString().notEmpty(),
    body('languageName', 'Please enter a languageName').isString().notEmpty(),
    body('status', 'Please enter a valid status').isString().notEmpty()
], (req, res) => {
    languageService
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
    const language_id = req.params.id;
    languageService.findById(language_id)
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