const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const dFrontend = require('./routes/detailedFRoute');
const UserLoginDetails = require('./routes/userRoutes');
const checkboxUpdate = require('./routes/checkboxRoute');
const cors = require('cors'); // Import the cors package

app.use(express.json());

// Use the cors middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

app.use('/api/detailedFrontend', dFrontend);
app.use('/api/user', UserLoginDetails);
app.use('/api/updateCheckbox', checkboxUpdate);

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();  
});

// New Hello, World! route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connection to the database
mongoose.connect(process.env.MONG) // Correct the process.env variable
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server Started !");
        });
    })
    .catch((error) => {
        console.log(error);
    });
