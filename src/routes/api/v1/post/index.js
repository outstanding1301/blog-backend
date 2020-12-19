const express = require('express');
const {Post} = require('@models');

const routes = express.Router();

const getPostRouter = async (req, res) => {
    const {id} = req.query;
    console.log(req.query);
    if(id) {
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
    const result =  await Post.createPost(req.user, title, contents);
    if(!result) {
        next(new Error('글쓰기 실패!'));
        return;
    }
    res.status(200).json(result.get());
}

const deletePostRouter = async (req, res) => {
    const {id} = req.query;
    if(!req.user) {
        res.status(403).json({
            success: false,
            data: '로그인 정보가 없습니다.'
        })
        return;
    }
    const result =  await Post.deletePost(req.user, id);
    if(result === 0) {
        return res.status(404).json("그런 글은 없습니다.");
    }
    return res.status(200).json(id);
}

routes.get('/', getPostRouter);
routes.post('/', postPostRouter);
routes.delete('/', deletePostRouter);

module.exports = routes;