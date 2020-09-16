const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('app-module-path').addPath(__dirname);

require('dotenv').config();
require('auth')(passport);

const routes = require('routes');

const app = express();

app.use(morgan('dev'));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(routes);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        data: 'API Not Found!'
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        data: err.message
    });
})

app.listen(process.env.PORT, ()=>{
    console.log(`🔥 server is running at http://localhost:${process.env.PORT}`);
    console.log(`🔥 with ${process.env.NODE_ENV} MODE`);
});

// 