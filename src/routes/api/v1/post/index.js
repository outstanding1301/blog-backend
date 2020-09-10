const { raw } = require('body-parser');
const express = require('express');
const { Op } = require('sequelize');
const {Post, User} = require('../../../../database/models');

const routes = express.Router();

const findPostById = async (id) => {
    const post = await Post.findOne({
        attributes: ['id', 'author', 'User.nickname', 'User.username', 'title', 'contents', 'postedDate', 'updatedDate'],
        where: {
            id
        },
        include: [
            {
                model: User,
                required: false,
                attributes: []
            },
        ],
        raw: true
    });
    return post;
}

const findPostByTitle = async (title) => {
    const post = await Post.findAll({
        attributes: ['id', 'author', 'User.nickname', 'User.username', 'title', 'contents', 'postedDate', 'updatedDate'],
        where: {
            title: {
                [Op.like]: `%${title}%`
            }
        },
        include: [
            {
                model: User,
                required: false,
                attributes: []
            }
        ],
        raw: true
    });
    return post;
}

const findPostByAuthor = async (author) => {
    const post = await Post.findAll({
        attributes: ['id', 'author', 'User.nickname', 'User.username', 'title', 'contents', 'postedDate', 'updatedDate'],
        where: {
            'User.username': {
                [Op.like]: `%${author}%`
            }
        },
        include: [
            {
                model: User,
                required: false,
                attributes: []
            }
        ],
        raw: true
    });
    return post;
}

const findPostByNickname = async (nickname) => {
    const user = await User.findOne({
        attributes: ['username'],
        where: {
            nickname
        },
        raw: true
    });
    if(!user) return user;
    const userId = user.id;
    const post = await findPostByAuthor(userId);
    return post;
}

const findPostByContents = async (contents) => {
    const post = await Post.findAll({
        attributes: ['id', 'author', 'User.nickname', 'User.username', 'title', 'contents', 'postedDate', 'updatedDate'],
        where: {
            contents: {
                [Op.like]: `%${contents}%`
            }
        },
        include: [
            {
                model: User,
                required: false,
                attributes: []
            }
        ],
        raw: true
    });
    return post;
}


const findPostByTitleOrContents = async (contents) => {
    const post = await Post.findAll({
        attributes: ['id', 'author', 'User.nickname', 'User.username', 'title', 'contents', 'postedDate', 'updatedDate'],
        where: {
            [Op.or]: [
                {
                    contents: {
                        [Op.like]: `%${contents}%`
                    }
                },
                {
                    title: {
                        [Op.like]: `%${contents}%`
                    }
                }
            ]
        },
        include: [
            {
                model: User,
                required: false,
                attributes: []
            }
        ],
        raw: true
    });
    return post;
}

const createPost = async (author, title, contents) => {
    const result = await Post.create({
        author, title, contents
    });
    return result;
}

const getPostRouter = async (req, res) => {
    const {id, contents, title, author, nickname} = req.body;
    if(id) {
        const post = await findPostById(id);
        if(post) {
            res.status(200).json({
                success: true,
                data: post
            })
        }
        else {
            res.status(404).json({
                success: false,
                data: '포스트를 찾을 수 없습니다.'
            })
        }
    }
    else if (title) {
        if(contents) {
            const posts = await findPostByTitleOrContents(title);
            if(posts) {
                res.status(200).json({
                    success: true,
                    data: posts
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    data: '포스트를 찾을 수 없습니다.'
                })
            }
        }
        else {
            const posts = await findPostByTitle(title);
            if(posts) {
                res.status(200).json({
                    success: true,
                    data: posts
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    data: '포스트를 찾을 수 없습니다.'
                })
            }
        }
    }
    else if (contents) {
        const posts = await findPostByContents(contents);
        if(posts) {
            res.status(200).json({
                success: true,
                data: posts
            })
        }
        else {
            res.status(404).json({
                success: false,
                data: '포스트를 찾을 수 없습니다.'
            })
        }
    }
    else if (author) {
        const posts = await findPostByAuthor(author);
        if(posts) {
            res.status(200).json({
                success: true,
                data: posts
            })
        }
        else {
            res.status(404).json({
                success: false,
                data: '포스트를 찾을 수 없습니다.'
            })
        }
    }
    else if (nickname) {
        const posts = await findPostByNickname(nickname);
        if(posts) {
            res.status(200).json({
                success: true,
                data: posts
            })
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
    const {author, title, contents} = req.body;
    const result =  await createPost(author, title, contents);
    if(!result) {
        next(new Error('글쓰기 실패!'));
        return;
    }
    res.status(200).json({
        success: true,
        data: result.get()
    })

    console.log(result.get());
}

routes.get('/', getPostRouter);
routes.post('/', postPostRouter);

module.exports = routes;