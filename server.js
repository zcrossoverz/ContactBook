const express = require('express');
const cors = require('cors');
const config = require('./app/config');
const { BadRequestError } = require('./app/helpers/errors');
const setUpContactRoutes = require('./app/routes/contact.routes');
const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content - type application/json
app.use(express.json());

// parse requests of content - type application/x-www-form-urlencode
app.use(express.urlencoded({ extended:true }));

// conect db
const db = require('./app/models');

db.mongoose
    .connect(config.db.url)
    .then(() => {
        console.log('connected to the database!');
    }).catch((err) => {
        console.log('cannot connect to the database!',err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});

setUpContactRoutes(app);

app.use((req, res, next) => {
    next(new BadRequestError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});





const PORT = config.app.port;

app.listen(PORT, () => {
    console.log(`Server is runnin on port ${PORT}`);
})