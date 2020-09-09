const { raw } = require('body-parser');
const express = require('express');
const { Op } = require('sequelize');
const {Post, User} = require('../../../database/models');

const routes = express.Router();

const findPostById = async (id) => {
    const post = await Post.findOne({
        attributes: ['id', 'author', 'User.nickname', 'title', 'contents', 'postedDate', 'updatedDate'],
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
        attributes: ['id', 'author', 'User.nickname', 'title', 'contents', 'postedDate', 'updatedDate'],
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
        attributes: ['id', 'author', 'User.nickname', 'title', 'contents', 'postedDate', 'updatedDate'],
        where: {
            author: {
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
        attributes: ['id'],
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
        attributes: ['id', 'author', 'User.nickname', 'title', 'contents', 'postedDate', 'updatedDate'],
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
        attributes: ['id', 'author', 'User.nickname', 'title', 'contents', 'postedDate', 'updatedDate'],
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
        res.send(post);
    }
    else if (title) {
        if(contents) {
            const posts = await findPostByTitleOrContents(title);
            res.send(posts);
        }
        else {
            const posts = await findPostByTitle(title);
            res.send(posts);
        }
    }
    else if (contents) {
        const posts = await findPostByContents(contents);
        res.send(posts);
    }
    else if (author) {
        const posts = await findPostByAuthor(author);
        res.send(posts);
    }
    else if (nickname) {
        const posts = await findPostByNickname(nickname);
        res.send(posts);
    }
    else {
        res.status(500).send({});
    }
}

const postPostRouter = async (req, res) => {
    const {author, title, contents} = req.body;
    const result =  await createPost(author, title, contents);
    if(!result) {
        res.status(500).send('실패');
        return;
    }
    res.send('글 등록됨 ');
    console.log(result.get());
}

routes.get('/', getPostRouter);
routes.post('/', postPostRouter);

module.exports = routes;