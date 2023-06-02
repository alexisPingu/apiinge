require('dotenv').config()
const jwt=require('jsonwebtoken');
const EXPIRES_IN='6h';

module.exports.createToken=(body)=>{
    const token=jwt.sign(body,process.env.KEY_JWT,{expiresIn:EXPIRES_IN});
    return token;
}
module.exports.validateToken=(token)=>{
    jwt.verify(token,process.env.KEY_JWT,(err,decode)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){
                obj ={status:1};//El token ya no es valido expiradop
            }else{
                obj={status:2}; //El token no es valido //no existe o no formato correcto    
            }
        }else{
            obj ={datos:decode,status:3};//El token es valido
        }
    });
    return obj;
}