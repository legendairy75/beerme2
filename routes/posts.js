const express = require('express');
const router = express.Router()
const catchAsync = require('../utils/catchAsync');
// const { postSchema } = require('../schemas.js');
// const ExpressError = require('../utils/ExpressError');
var createError = require('http-errors');

// const Post = require('../models/post')
const posts = require('../controllers/posts')
const { isLoggedIn, validatePost, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(
    catchAsync(posts.index))
  .post(
    isLoggedIn,
    upload.array('image'),
    validatePost,
    catchAsync(posts.createPost))

router.route('/new')
  .get(
    isLoggedIn,
    catchAsync(posts.renderNewForm))

router.route('/:id')
  .get(
    catchAsync(posts.showPost))
  .put(
    isLoggedIn,
    upload.array('image'),
    validatePost,
    catchAsync(posts.updatePost))
  .delete(
    isLoggedIn,
    catchAsync(posts.deletePost))

router.get('/:id/edit',
  isLoggedIn,
  catchAsync(posts.renderEditForm))

module.exports = router;
