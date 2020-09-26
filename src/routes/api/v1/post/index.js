const express = require('express');
const {Post} = require('@models');

const routes = express.Router();

const getPostRouter = async (req, res) => {
    const {id, author} = req.query;
    if(id && author) {
        const post = await Post.findPostById(id);
        if(post) {
            res.status(200).json(post)
        }
        else {
            res.status(404).json({
                success: false,
                data: '포스트를 찾을 수 없습니다.'
            })
        }
    }
    else {
        res.status(404).json({
            success: false,
            data: '포스트를 찾을 수 없습니다.'
        })
    }
}

const postPostRouter = async (req, res) => {
    const {title, contents} = req.body;
    if(!req.user) {
        res.status(403).json({
            success: false,
            data: '로그인 정보가 없습니다.'
        })
        return;
    }
    const result =  await Post.createPost(req.user._id, title, contents);
    if(!result) {
        next(new Error('글쓰기 실패!'));
        return;
    }
    res.status(200).json(result.get());
}

const deletePostRouter = async (req, res) => {
    const {id} = req.body;
    if(!req.user) {
        res.status(403).json({
            success: false,
            data: '로그인 정보가 없습니다.'
        })
        return;
    }
    const result =  await Post.deletePost(req.user._id, id);
    // if(!result) {
    //     next(new Error('글쓰기 실패!'));
    //     return;
    // }
    res.status(200).json(result);
}

routes.get('/', getPostRouter);
routes.post('/', postPostRouter);
routes.delete('/', deletePostRouter);

module.exports = routes;