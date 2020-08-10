
const express = require('express');
const {
  getAll,
  getById,
  post,
  put,
  remove
} = require('../controller/userController');

const User=require('../models/User');

const router = express.Router();

const {protect,authorize}=require('../middelware/auth');

const advancedResults=require('./../middelware/advancedResults');



router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(User), getAll)
  .post(post);

router
  .route('/:id')
  .get(getById)
  .put(put)
  .delete(remove);

module.exports = router;