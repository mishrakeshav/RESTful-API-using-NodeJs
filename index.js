const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// import routes 
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log('Connected to DB')
);

// MiddleWare 
app.use(express.json());



// Route middlewares 
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

app.listen(3000,()=>console.log("Server running on port 3000"));