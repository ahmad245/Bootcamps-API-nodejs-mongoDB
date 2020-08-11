const express = require('express');
const {
  getAll,
  getById,
  post,
  put,
  remove
} = require('../controller/reviewController');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middelware/advancedResults');
const { protect, authorize } = require('../middelware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getAll
  )
  .post(protect, authorize('user', 'admin'), post);

router
  .route('/:id')
  .get(getById)
  .put(protect, authorize('user', 'admin'), put)
  .delete(protect, authorize('user', 'admin'), remove);

module.exports = router;