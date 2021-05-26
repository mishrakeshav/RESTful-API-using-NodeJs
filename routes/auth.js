const router = require('express').Router();
const User = require('../models/User');
const { registerValidation , loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




// register 
router.post('/register',async (req,res)=>{

    const { error  } = registerValidation(req.body);
    
    if(error){
        return res.status(400).send(error);
    }
    // Check if email is already registered
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist){
        return res.status(400).send('Email Already Exists');
    }
    // Hash the password 
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    // Create a new user 
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user : savedUser.id});
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

//login 
router.post('/login',async (req,res)=>{

    const { error  } = loginValidation(req.body);
    
    if(error){
        return res.status(400).send(error);
    }
    // Check if email is registered
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Email is not valid');
    }
    //check Password 
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).send('Password is not valid');
    }
    // create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    
});



module.exports = router;