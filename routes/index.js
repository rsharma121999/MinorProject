const express      = require("express"),
      router       = express.Router(),
      jwt          = require("jsonwebtoken"),
      User         = require("../models/user"),
      refreshTokens= {};

//REGISTER ROUTE
router.post("/register",async(req,res)=>{
    try{   
        let user = await User.findOne({email:req.body.email})
        if(user) return res.status(200).json({msg:"User already exists"})
        user = await User.create({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            image:"https://res.cloudinary.com/image-storage/image/upload/v1572009434/blank-avatar_opbhgx.png"
        });
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET_KEY,
            { expiresIn:3600 }
        )
        res.status(200).json({user,token});
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg:"registeration unsuccessful"});
    }
})

//LOGIN ROUTE - CHECK EMAIL 
router.post("/login/checkEmail",async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email})
        if(user!=null) res.status(200).json({msg:"user email found"})
        else res.status(404).json({msg:"email not found"});
    }
    catch(err){
        res.status(204).send(err);
    }
})

//LOGIN ROUTE- VERIFY PASSWORD
router.post("/login/checkPwd",async(req, res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        let isMatch = (req.body.password == user.password ) ? true : false;
        if(!isMatch) return res.status(400).json({msg:"Invalid Password"})
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET_KEY,
            { expiresIn:3600 }
        ) 
        
        res.status(200).json({user,token});
    }
    catch(err){
        res.status(400).json({msg:"Something went wrong"})
    }
})

router.post("/token",async (req,res)=>{
    const refreshToken = req.body.refreshToken
    if((refreshToken in refreshTokens) && (refreshTokens[refreshToken]==req.body.email)){
        const user = await User.findOne({email:req.body.email})
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET_KEY,
            { expiresIn:3600 }
        )
        res.status(200).json({user,token,refreshToken})
    }
    else {
        res.status(404).json({mssg:'Invalid request'})
    }
})

module.exports=router;