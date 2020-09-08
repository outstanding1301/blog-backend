const models = require('./database/models/index');
const crypto = require('../.crypto');

// models.User.findOrCreate({
//     where: {id: 'test'},
//     defaults: {
//         nickname: '테스트',
//         password: 'testpw'
//     }
// });

// models.Post.create({
//     author: 'test',
//     title: '글쓰기 테스트',
//     contents: '글 내용'
// });

// models.Post.findAll({
//     attributes: ['id', 'User.nickname', 'contents', 'postedDate'],
//     where: {
//         author: 'test',
//     },
//     include: [
//         {
//             model: models.User,
//             required: false,
//             attributes: ['nickname']
//         }
//     ],
//     raw: true,
// }).then(postsOfTest => {
//     console.log(postsOfTest);
// });

// models.User.findAll({
//     include: ['Posts'],
//     raw: true
// }).then(data => console.log(data));

console.log(crypto('test'));