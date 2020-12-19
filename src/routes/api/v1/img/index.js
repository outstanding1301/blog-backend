const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const routes = express.Router();

const uploadImageRouter = async (req, res) => {
    if(!req.user) {
        res.status(403).json({
            success: false,
            data: '로그인 정보가 없습니다.'
        })
        return;
    }
    console.log(req.file);
    let url = req.file.path;
    url = "img/"+url.split("/")[1];
    res.status(200).json(url);
}

const getImage = async(req, res) => {
    const {filename} = req.params;
    const file = path.resolve('uploads/'+filename);
    if (fs.existsSync(file)) {
        res.status(200).sendFile(file);
    }
    else {
        res.status(404).send('그런 이미지는 없습니다.');
    }
}

const upload = multer(
    {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname, ext);
          cb(null, filename+"-"+Date.now()+ext);
        }
      }),
    }
);

routes.post('/', upload.single('image'), uploadImageRouter);
routes.get('/:filename', getImage);

module.exports = routes;