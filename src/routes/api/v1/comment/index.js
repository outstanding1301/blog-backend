const express = require('express');
const {Comment} = require('@models');

const routes = express.Router();

const getCommentsRouter = async (req, res) => {
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

    const comments = await Comment.getComments(postId);
    res.status(200).json(comments);
}

const postCommentRouter = async (req, res) => {
    const {postId, comment} = req.query;

    if(!req.user) {
        res.status(403).json({
            success: false,
            data: '로그인 정보가 없습니다.'
        })
        return;
    }
    if(!postId || !comment) {
        res.status(500).json({
            success: false,
            data: '잘못된 파라미터가 전달되었습니다.'
        })
        return;
    }

    const result = await Comment.writeComment(req.user, postId, comment);
    res.status(200).json(result);
}

const deleteCommentRouter = async (req, res) => {
    const {commentId} = req.query;
}

routes.get('/', getCommentsRouter);
routes.post('/', postCommentRouter);
routes.delete('/', deleteCommentRouter);

module.exports = routes;