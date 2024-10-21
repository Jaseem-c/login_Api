const users = require("../Model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.registerController=async(req,res)=>{
    const {username,password,email}=req.body

    try {

        const existingUser=await users.findOne({email})
        if (existingUser) {
         res.status(404).json('User already exists');
        }
        else{

       const salt= await bcrypt.genSalt(10)
       const hashedpassword=await bcrypt.hash(password,salt)


            const newUser=new users({
                username,
                password:hashedpassword,
                email
            })
            await newUser.save()
            res.status(200).json("Registration successfull")
        }
        
    } catch (error) {
        res.status(406).json(`registration failed due to ${error}`)
    }
}

exports.logincontroller=async(req,res)=>{
   
    const {email,password}=req.body

    try {
        const existingUser=await users.findOne({email})
        if(existingUser){
            const passwordMtach=await bcrypt.compare(password,existingUser.password)

                if(passwordMtach)
                {
                    const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRETKEY)
                    res.status(200).json({message:"login successfull",existingUser,token})
                }
                else{
                    res.status(404).json("Incorrect Password")
                }
        }
        else{
            res.status(404).json("User not found")
        }
    } catch (error) {
        res.status(406).json(`login failed due to ${error}`)
    }
}