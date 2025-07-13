const express=require('express')
const bodyParser=require('body-parser')
const mongoose =require('mongoose')
const cookieParser = require('cookie-parser');
const cors=require('cors')
// const authMiddleware = require("./middleware/authMiddleware");
const authRoutes=require("./routes/authRoutes")
const allBooksRoute=require("./routes/allBooksRoute")
const getMyBooks=require("./routes/myBooksRoute");
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config()

const app=express()
app.use(bodyParser.json()) 
app.use(cookieParser()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to local MongoDB"))
.catch(err => console.error("Connection error:", err));

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));


app.use('/api/auth',authRoutes)

app.use('/api',allBooksRoute)

app.use('/api',authMiddleware, getMyBooks)

// app.use('/api/mybooks',authMiddleware, getMyBooks)




app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})