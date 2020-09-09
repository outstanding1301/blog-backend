const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const morgan = require('morgan');

const routes = require('./routes');

app.use(morgan('dev'));
app.use(cors());

app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res) => {
    res.send('404 not found!');
});

app.listen(process.env.PORT, ()=>{
    console.log(`🔥 server is running at http://localhost:${process.env.PORT}`);
    console.log(`🔥 with ${process.env.NODE_ENV} MODE`);
});

// 