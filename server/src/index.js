const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const middlewares = require('./middlewares')
const logs = require('./api/logs')



mongoose.connect('mongodb://localhost/travel-log', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
//great tool for debugging
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
}))


app.use(express.json());

app.get('/', (req, res)=>{
    res.json({
        message: 'Hello World!',
    });
});


app.use('/api/logs', logs);



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1400;

app.listen(port, ()=>{
    console.log(`Listening at http://localhost:${port}`);
});
