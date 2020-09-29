const express = require('express');
const postRoute = require('@api/v1/post');
const postsRoute = require('@api/v1/posts');
const commentRoute = require('@api/v1/comment');
const likeRoute = require('@api/v1/like');

const routes = express.Router();
const auth = require('@api/v1/auth');

routes.use('/post', postRoute);
routes.use('/posts', postsRoute);
routes.use('/comment', commentRoute);
routes.use('/like', likeRoute);
routes.use('/auth', auth);


module.exports = routes;