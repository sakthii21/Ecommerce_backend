const user = require('../models/userModel');

const jwt = require('jsonwebtoken');
const bcrypt=require("bcryptjs");



//register
const register = async(req,res)=>{
    const {name, email,password}= (req.body);
    const insertdata = new user({
        name, email,password
    });
    try{
        const inserteddata = await insertdata.save();
        res.status(201).send(inserteddata);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

//login
const login = async(req,res)=>{
    const {email, password}=req.body;
   
    try{
        const users = await user.findOne({email});
        //{email} find user
        if(!users){
            return res.status(400).json({message: 'User not found'});
        }
        const invalidPassword = await bcrypt.compare(password, users.password);
        if(!invalidPassword ){
            return res.status(400).json({message: 'Invalid password'});
        }
        const token = jwt.sign({userId: users._id}, 'your_secret_key', {expiresIn: '1h'});
        res.json({token});
    }catch(error){
        // res.status(500).json({message: error.message});
        console.log(error);
    }
}

module.exports={register,login};