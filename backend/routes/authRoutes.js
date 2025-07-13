
const express = require('express');
const router = express.Router();
const RegisterController=require("../controllers/RegisterController")
const LoginController =require ("../controllers/LoginController")
const authMiddleware = require("../middleware/authMiddleware");

router.post('/register',RegisterController );

router.post('/login',LoginController)

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.json({ message: "Logged out successfully" });
});




router.get('/me', authMiddleware, (req, res) => {

  res.json({ message: "This is a protected route", user: req.user });
});



module.exports=router;