var jwt = require('jsonwebtoken');

const Auth=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token);
    if(token)
    {
      var  decoded = jwt.verify(token, 'masai');
      if(decoded)
      {
        console.log(decoded);
        req.body.user_id=decoded.user_id
        next();
      }
       
    }else{
        res.send({"msg":"please login!!"})
    }
}

module.exports={Auth}