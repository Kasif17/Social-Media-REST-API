const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')
const bcrypt = require("bcrypt")

dotenv.config();

//mongoose connection
async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
connectToDatabase();

// middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))


app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/postsw',postRoute)

//port listen
app.listen("8081",(req,re)=>{
    console.log("server is working now")
})