const User = require("../models/Users")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")

const RegisterController=async (req, res) => {
    console.log(req.body)
  try {
    const { name, email,password } = req.body;
    const existingUser=await User.findOne({email})
    // console.log("The existing user is --->",existingUser)
    if(existingUser){
        return res.status(400).json({error:"User ALready Registered"})
    }
    //hash password
    const saltRounds=10;
    const hashedPassword=await bcrypt.hash(password,saltRounds)

    //Crreate and save user
    const newUser=new User({name,email,password:hashedPassword})
    const savedUser=await newUser.save()

    const token=jwt.sign(

            {id:savedUser._id,email:savedUser.email},
            process.env.JWT_SECRET,
            {expiresIn:'12h'}    
    )

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax'
    });

     res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });


 } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports=RegisterController