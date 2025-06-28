const express = require('express');
const { auth } = require('../middlewares/auth');
const { updateProfile } = require('../controllers/user.controller');


const router = express.Router();

router.post("/update-profile"  ,auth , updateProfile);

module.exports = router;


