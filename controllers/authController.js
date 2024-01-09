const bcrypt=require('bcryptjs')
const User=require("../models/userModel")

exports.signUp=async (req,res)=>{
    const {username,password}=req.body
    try {
       const hashpassword=await bcrypt.hash(password,12)
       const newUser=await User.create({
        username,
        password:hashpassword
       });
       req.session.user=newUser;
       res.status(201).json({
        status:'success',
        data:{
            user:newUser
        }
       })
    } catch (error) {
        res.status(404).json({
            status:"fail"
        })
    }
}
exports.login=async (req,res)=>{
    const {username,password}=req.body;

    try {
        const user=await User.findOne({username})
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"User not found"
            })
        }
        else{
            const isCorrect=await bcrypt.compare(password,user.password)
            if(isCorrect){
                req.session.user=user;
                return res.status(200).json({
                    status:"success",
                    message:"Login Successfully"
                })
            }
            else{
                return res.status(402).json({
                    status:"fail",
                    message:"Incorrect username of password"
                })
            }
        }
    } catch (error) {
        res.staus(400).json({
            status:"fail",
            message:"Server error"
        })
    }
}