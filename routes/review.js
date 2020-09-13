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
const {clearCache}=require('../middelware/clearCache');

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
  .post(protect, authorize('user', 'publisher'),clearCache('Review'), post);

router
  .route('/:id')
  .get(getById)
  .put(protect, authorize('user', 'publisher'),clearCache('Review'), put)
  .delete(protect, authorize('user', 'publisher'),clearCache('Review'), remove);

module.exports = router;