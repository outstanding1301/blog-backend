const express = require('express');
const {Like} = require('@models');

const routes = express.Router();

const getLikesRouter = async (req, res) => {
    const {postId} = req.query;
    if(req.user) {

    }
    if(!postId) {
        res.status(500).json({
            success: false,
            data: '잘못된 파라미터가 전달되었습니다.'
        })
        return;
    }

    const likes = await Like.getLikes(postId);
    res.status(200).json(likes);
}

const likeRouter = async (req, res) => {
    const {postId} = req.body;

    if(!req.user) {
        res.status(403).json({
            success: false,
            data: '로그인 정보가 없습니다.'
        })
        return;
    }
    if(!postId) {
        res.status(500).json({
            success: false,
            data: '잘못된 파라미터가 전달되었습니다.'
        })
        return;
    }

    const result = await Like.likePost(req.user, postId);
    res.status(200).json(result);
}

routes.get('/', getLikesRouter);
routes.post('/', likeRouter);

module.exports = routes;