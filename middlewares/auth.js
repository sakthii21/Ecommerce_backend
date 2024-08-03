const jwt = require('jsonwebtoken');

//access token get verified and token will send to header , the header extract the token 

// Bearer asdfghjklkjhgfdsdfghjk  
//     0            1
// ["Bearer","asdfghjklkjhgfdsdfghjk "] => after spilt method 
 // split method return the data as array 


const auth = (req,res,next)=>{
   //const token = req.header('Authorization').replace('Bearer'," ");
const token = req.header('Authorization').split(' ')[1];
   if(!token) return res.status(401).json({error: "Token required"});
   try{
    const decoded = jwt.verify(token,"your_secret_key");//verifyind the access token
    req.user = decoded.userId; 
    next();
   }catch(err){
    res.status(401).json({error: "Invalid Token"});//after 1 hour the acces token get expired . erroe will be acquired in cache 
   }
};
module.exports = auth;

//ss token (secret sign-on)=> accesing by the email to verify  