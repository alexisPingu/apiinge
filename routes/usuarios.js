const connection = require('../database/config');
const { crearUusario, logearUsuario } = require('../database/usuario.operaciones');

const usuarios=require('express').Router();

usuarios.post('/',(req,res)=>{
    const {usuario,contraseña}=req.body;
    crearUusario(connection,{usuario,contraseña,permiso:1},(err,resp)=>{
        if(err){
            res.status(500).json({message:err.message || 'Nose pudo crear el usuario'});//error en servidor
        }else{
            res.status(200).json(resp);
        }
    })
});

usuarios.post('/login',(req,res)=>{
    const {usuario,contraseña}=req.body;
    console.log(req.body);
    logearUsuario(connection,{usuario,contraseña},(err,resp)=>{
        if(err){
            res.status(500).json({message:err.message || 'El usuario no es correcto'});//error en servidor
        }else{
            res.status(200).json(resp);
        }
    })
});
module.exports=usuarios;