const express = require("express");
const router = express.Router();

const DonorService = require('./donorService');
donorService = new DonorService();


router.get('/', (req, res) => {
	let { page, size } = req.query;
  
	donorService.list(page, size)
	  .then(data => res.status(200).send(
		{
		  page,
		  size,
		  data: data
		}
	  ))
	  .catch(err => res.status(400).send(
		{
		  err: err.message
		}
	  ));
  });


module.exports = router;