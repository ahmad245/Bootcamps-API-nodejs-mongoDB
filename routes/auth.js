
const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  
  updateDetails,
//   updatePassword,
//   forgotPassword,
//   resetPassword
} = require('../controller/authController');

const router = express.Router();

const { protect } = require('../middelware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
