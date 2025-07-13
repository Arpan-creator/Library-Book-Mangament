const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");
const allBooksRoute = require("./routes/allBooksRoute");
const getMyBooks = require("./routes/myBooksRoute");
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));

// CORS setup
// You can specify multiple allowed origins here
const allowedOrigins = [
  "http://localhost:5173",
  "https://preeminent-kitsune-667ddb.netlify.app",            // your local frontend dev URL
  process.env.FRONTEND_URL || "","*"     // your deployed frontend URL (set after deployment)
];



// Filter requests based on origin
app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin like Postman or curl
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', allBooksRoute);
app.use('/api', authMiddleware, getMyBooks);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
