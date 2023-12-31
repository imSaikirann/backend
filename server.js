const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const dFrontend = require('./routes/detailedFRoute');
const dBackend = require('./routes/backendRoutes');
const UserLoginDetails = require('./routes/userRoutes');
const checkboxUpdate = require('./routes/checkboxRoute');
const devTools = require('./routes/devTools')
const cors = require('cors');
 
app.use(cors());
app.use(express.json());

app.use('/api/detailedFrontend', dFrontend);
app.use('/api/backendRoadmap', dBackend);

app.use('/api/user', UserLoginDetails);
app.use('/api/updateCheckbox', checkboxUpdate);   
app.use('/api/devtools',devTools) 

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
