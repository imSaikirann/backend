const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const dFrontend = require('./routes/detailedFRoute');
const UserLoginDetails = require('./routes/userRoutes');
const checkboxUpdate = require('./routes/checkboxRoute');
const cors = require('cors');

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'https://fnss.netlify.app'],
  credentials: true, 
}));

app.use('/api/detailedFrontend', dFrontend);
app.use('/api/user', UserLoginDetails);
app.use('/api/updateCheckbox', checkboxUpdate);

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();  
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server Started !"); 
        }); 
    })
    .catch((error) => {
        console.log(error);
    });
