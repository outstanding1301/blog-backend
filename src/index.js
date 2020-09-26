const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('module-alias/register');

require('dotenv').config();

const routes = require('@routes');
const jwtMiddleware = require('@lib/jwtMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
    limit: '50mb'
}));

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

// app.use(passport.initialize());
// app.use(passport.session());

app.use(jwtMiddleware);
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