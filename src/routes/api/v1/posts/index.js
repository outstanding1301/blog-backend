const express = require('express');
const {Post} = require('@models');

const routes = express.Router();

const getPostsRouter = async (req, res) => {
    const {author, limit, isNew, id} = req.query;
    
    if (author) {
        const posts = await Post.findPostsByAuthor(author, limit, isNew, id);
        if(posts) {
            res.status(200).json(posts)
        }
        else {
            res.status(404).json({
                success: false,
                data: '포스트를 찾을 수 없습니다.'
            })
        }
    }
    else {
        const posts = await Post.findPosts(limit, isNew, id);
        if(posts) {
            res.status(200).json(posts)
        }
        else {
            res.status(404).json({
                success: false,
                data: '포스트를 찾을 수 없습니다.'
            })
        }
    }
}

routes.get('/', getPostsRouter);

module.exports = routes;