const express = require('express');
const cors = require('cors');
const config = require('./app/config');
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


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});


setUpContactRoutes(app);



const PORT = config.app.port;

app.listen(PORT, () => {
    console.log(`Server is runnin on port ${PORT}`);
})