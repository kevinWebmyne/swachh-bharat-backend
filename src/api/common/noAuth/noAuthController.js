const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const { body, validationResult } = require('express-validator');
const {file_path , domain } = config.get('uploads');
const {port} = config.get('api');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const router = express.Router();
const Stripe_Key ='sk_test_51KA6gcSI4CnqFLAnNMb6V2G5wKC4vRt8vEfDi9h7nvGvMlpulPeoT2a7oUlBeF4RRXLBqiZUowwam49fDvBbhtNs00tnC1VduQ';
const stripe = require("stripe")(Stripe_Key);

//#region define
const UserService = require('../user/userService');
userService = new UserService();

const VolunteerService = require('../volunteer/volunteerService');
volunteerService = new VolunteerService();

const PledgeService = require('../pledge/pledgeService');
pledgeService = new PledgeService();

const ProgrammesService = require('../programmes/programmesService');
programmesService = new ProgrammesService();

const ContactService = require('../contact/contactService');
contactService = new ContactService();

const CmsService = require('../cmsBlock/cmsService');
cmsService = new CmsService();

const SliderService = require('../slider/sliderService');
sliderService = new SliderService();

const StateService = require('../state/stateService');
stateService = new StateService();

const ImpactService = require('../ourImpact/impactService');
impactService = new ImpactService();

const CountryService = require('../country/countryService');
countryService = new CountryService();

const PageService = require('../page/pageService');
pageService = new PageService();

const DonorService = require('../donor/donorService');
donorService = new DonorService();

const VolunteerDataService = require('../volunteerData/volunteerService');
const volunteerDataService = new VolunteerDataService();


//#endregion

//#region Volunteer
router.post('/volunteers/register', [
  body('name', 'Please enter valid  name').isString().notEmpty(),
  body('email', 'Please enter valid email').trim().isEmail(),
  body('mobile', 'Please enter valid  mobile').isInt().notEmpty(),
  body('city', 'Please enter valid  city').isString().notEmpty(),
  body('state', 'Please enter valid  state').isString().notEmpty(),
  body('message', 'Please enter valid  message').isString().notEmpty(),
  // body('password', 'Please enter valid password(Min. 6 characters.)').isString().trim().isLength({ min: 6 }),
], (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array();
    res.status(422).send(
      {
        status: 422,
        err_msg: err_array[0].msg
      });
  } else {

    volunteerService
      .register(req.body)
      .then(() => res.status(200).send(
        {
          data: "You have been registered successfully! Please check your email and verify."
        }

      ))
      .catch(err => res.status(400).send(
        {
          err_msg: err.message
        }
      ));


  }
});

// get all  Volunteer
router.get(`/volunteers`, async (req, res) => {
  let { page, size } = req.query;

  volunteerService.list(page, size)
    .then(volunteers => res.status(200).send(
      { 
        page,
        size,
      data :  volunteers
      }
      
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});


// registration confirmation
router.get('/confirmation/:email/:token', (req, res) => {
  volunteerService
    .confirm_user(req.params.email, req.params.token)
    .then((data) => res.status(200).send(
      {
        data: data
      }
    ))
    .catch(err => res.status(400).send(
      {
        err_msg: err.message
      }
    ));
});

//volunteers login
//#region 
// router.post('/volunteers/login', async (req, res) => {
//   var user_data = await volunteerService.findByEmail(req.body.email);

//   if (!user_data) {
//     return res.status(404).send(
//       {
//         err_msg: 'User does not exists'
//       }
//     )
//   }

//   if (!user_data.is_verified) {
//     return res.status(400).send(
//       {
//         err_msg: 'You are not verified user of the system. Please check your email or contact admin for the verification'
//       }
//     )
//   }

//   // console.log();

//   const { email, password } = req.body
//   const user = volunteerService
//     .findByEmail(email)
//     .then(user => {
//       if (bcrypt.compare(password, user.passwordHash, function (err, results) {
//         if (err) { console.log(err, 'error'); }
//         if (results == true) {
//           var user_token = jwt.sign({ id: user._id, token: crypto.randomBytes(16).toString('hex') }, config.get('auth.jwt.secret'), { expiresIn: config.get('auth.jwt.expiresIn') }) ;
//           return res.status(200).send({
//             data: user_token
//           });
//         }
//         else {
//           return res.json({ status: 'password is incorrect' })
//         }
//       }));
//     })

// });
//#endregion

//#endregion

//#region user login
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body
  const user = userService
    .findByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(404).send(
          {
            err_msg: 'admin does not exists'
          }
        )
      }


      if (bcrypt.compare(password, user.password, function (err, results) {
        if (err) { console.log(err, 'error'); }
        if (results == true) {
          console.log(results);
          var user_token = jwt.sign({ id: user._id, token: crypto.randomBytes(16).toString('hex') }, config.get('auth.jwt.secret'),  { expiresIn: config.get('auth.jwt.expiresIn') });
          return res.json({
            status: 200,
            data: user_token,
           })
        }
        else {
          return res.status(404).json({ status: 'invalid password' })
        }
      }));
    })
});
//#endregion

//#region take a pledge 
router.post('/pledge', [
  body('name', 'Please enter valid  name').isString().notEmpty(),
  body('email', 'Please enter valid email').trim().isEmail(),
  body('mobile', 'Please enter valid  mobile').isInt().notEmpty(),
  body('state', 'Please enter valid  state').isString().notEmpty(),
  body('city', 'Please enter valid  city').isString().notEmpty(),
  body('message', "Please select valid  message").isString().isString(),
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
    pledgeService
      .pledge(req.body)
      .then(() => res.status(200).send(
        {
          data: "Your Pledge is registered successfully."
        }
      ))
      .catch(err => res.status(400).send(
        {
          err_msg: err.message
        }
      ));
  }
});
//#endregion

//#region  get all the programmers
router.get('/programmes', (req, res) => {
  let { page, size } = req.query;

  programmesService.list(page, size)
    .then(volunteers => res.status(200).send(
      {
        page,
        size,
        data: volunteers
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
})
//#endregion

//#region contact 
router.post('/contact', [
  body('name', 'Please enter valid  name').isString().notEmpty(),
  body('email', 'Please enter valid email').trim().isEmail(),
  body('subject', 'Please enter valid  subject').isString().notEmpty(),
  body('message', 'Please enter valid  message').isString().notEmpty()
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
    contactService
      .contact(req.body)
      .then(() => res.status(200).send(
        {
          data: "Your contact is registered successfully."
        }
      ))
      .catch(err => res.status(400).send(
        {
          err_msg: err.message
        }
      ));
  }
});
//#endregion

//#region  get all the cmsBlock
router.get('/cms', (req, res) => {
  let { page, size } = req.query;

  cmsService.list(page, size)
    .then(cms => res.status(200).send(
      {
        page,
        size,
        data: cms
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
})
//#endregion

//#region  get all the slider
router.get('/slider', (req, res) => {
  let { page, size } = req.query;
console.log(page);
  sliderService.list(page, size)
    .then(cms => res.status(200).send(
      {
        page,
        size,
        data: cms,
        
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});


router.post('/re', (req,res) =>{
  console.log(req.body);
})
//#endregion

//#region  get all the state
router.get('/state', (req, res) => {
  let { page, size } = req.query;
  console.log(page);
  stateService.list(page, size)
    .then(country => res.status(200).send(
      {
        data: country
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
})


router.get('/state/:id', (req,res) => {
  const state_id = req.params.id;
  stateService.findById(state_id)
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
//#endregion

//#region get all the impact
router.get('/impact', (req, res) => {
  let { page, size } = req.query;

  impactService.list(page, size)
    .then(cms => res.status(200).send(
      {
        page,
        size,
        data: cms
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});
//#endregion

//#region get all the country
router.get('/country', (req, res) => {
  let { page, size } = req.query;

  countryService.list(page, size)
    .then(country => res.status(200).send(
      {
        page,
        size,
        data: country
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});
//#endregion

//#region get all pages 

router.get('/pages', (req, res) => {
  let { page, size } = req.query;

  pageService.list(page, size)
    .then(cms => res.status(200).send(
      {
        page,
        size,
        data: cms
      }
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
})

router.get('/page/:id', (req,res) => {
  const page_id = req.params.id;
  pageService.findById(page_id)
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
//#endregion

//#region donor 

router.post('/donor', [
	body('amount', 'Please enter valid  amount').isInt().notEmpty(),
	body('name', 'Please enter valid name').isString().notEmpty(),
	body('emailAddress', 'Please enter valid emailAddress').isString().notEmpty(),
	body('phone', 'Please enter valid  phone').isInt().notEmpty(),
	body('streetAddress', 'Please enter valid  streetAddress').isString().notEmpty(),
	body('panNumber', 'Please enter valid  Pan Number').isInt().notEmpty(),
	body('addressLine2', 'Please enter valid  addressLine2').isString().notEmpty(),
	body('state', 'Please enter valid  state').isString().notEmpty(),
	body('city', 'Please enter valid  city').isString().notEmpty(),
	body('postalCode', 'Please enter valid  postalCode').isInt().notEmpty(),
	body('country', 'Please enter valid  country').isString().notEmpty(),
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
	donorService
		.register(req.body)
		.then(() => res.status(200).send(
		  {
			data: "Your donor is created successfully."
		  }
		))
		.catch(err => res.status(400).send(
		  {
			err_msg: err.message
		  }
		));
	}
  });
  
  router.post('/checkout', async (req, res) => {
    // console.log(req.body);
    const { token = {} } = req.body; 


    if (!Object.keys(token).length ) {
        res.status(400).json({ success: false });
    }

    const { id:customerId } = await stripe.customers.create({
        email: token.email,
        source: token.id, 
    }).catch(e => { 
        console.log(e);
        return null; 
    })

    if (!customerId) {
        res.status(500).json({ success: false });
        return; 
    }

    const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;

    const charge = await stripe.charges.create({
        amount: req.body.data.amount * 100,
        currency: "INR",
        customer: customerId,
        receipt_email: token.email,
        description: "Donation",
        shipping: {
            name: token.card.name,
            address: {
              line1: req.body.data.streetAddress,
              line2:  req.body.data.addressLine2,
              city:  req.body.data.city,
              country: req.body.data.country,
              postal_code: req.body.data.postalCode,
            },
        }
    })
    if (charge.status === "succeeded") {
      console.log(charge.id, charge.status);
      donorService
      .register(req.body.data, charge.id, charge.status)
      .then(() => res.status(200).send(
        {
        data: "Your donor is created successfully."
        }
      ))
      .catch(err => res.status(400).send(
        {
        err_msg: err.message
        }
      ));
  
        } else {
          return res
            .status(400)
            .send({ Errors: "Please try again later for One Time Payment" });
        }
       
   

 

    
    
});


//#endregion


router.get(`/volunteerData`, async (req, res) => {
  let { page, size } = req.query;

  volunteerDataService.list(page, size)
    .then(volunteers => res.status(200).send(
      { 
        page,
        size,
      data :  volunteers
      }
      
    ))
    .catch(err => res.status(400).send(
      {
        err: err.message
      }
    ));
});



module.exports = router;
