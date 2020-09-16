require('module-alias/register');

const models = require('@models');
// const crypto = require('@src/.crypto');
const crypto = require('crypto');

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

// console.log(crypto('dktmqh#1234'));

const pw = crypto.pbkdf2Sync('dktmqh#1234', 'sogeum', 112, 64, 'sha512').toString('base64');
console.log(pw);
// ZXOMXmp3UdvEjAThAUgTr99K3Hjx0nobNxryMdFEPtLrvbNVkE5lb5pOS2xLo8Gza4/ieTjUchHW3OqrLb7HNA==