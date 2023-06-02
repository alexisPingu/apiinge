const { validateToken } = require('../assets/jwt');
const connection = require('../database/config');
const { obtenerTareas, crearTareas, actualizarTarea, eliminarTarea } = require('../database/tarea.operaciones');

const tareas=require('express').Router();


tareas.get('/',(req,res)=>{
    const token=req.headers['authorization']
    //const id=req.params.id; //const {id}=req.params
    const validacion=validateToken(token)
    console.log(validacion)
    if(validacion.status==1){
        res.status(403).json({message:'Acceso denegado por token expirado'});
    }else if(validacion.status==2){
        res.status(403).json({message:'El acceso no es un token valido'})
    }else{
        let idUsuario=validacion.datos.id_usuario;
        obtenerTareas(connection,idUsuario,(err,resp)=>{
            if(err) res.status(500).json({message:err.message} || 'Error del servidor/ Intentalo mas tarde');
            else res.status(200).json(resp);

        })
    }
});


tareas.post('/',(req,res)=>{
    const token=req.headers['authorization']
    //const id=req.params.id; //const {id}=req.params
    const validacion=validateToken(token)
    console.log(validacion);
    if(validacion.status==1){
        res.status(403).json({message:'Acceso denegado por token expirado'});
    }else if(validacion.status==2){
        res.status(403).json({message:'El acceso no es un token valido'})
    }else{
        let idUsuario=validacion.datos.id_usuario;
        const {tarea}=req.body;
        crearTareas(connection,{tarea,status:'0',id:idUsuario},(err,resp)=>{
            if(err){
                res.status(500).json({message:err.message || 'Nose pudo crear la tarea'});//error en servidor
            }else{
                res.status(200).json(resp);
            }
        })
    }
    
});

tareas.put('/:idTarea',(recibido,mandar)=>{
    const token=recibido.headers['authorization']
    //const id=req.params.id; //const {id}=req.params
    const validacion=validateToken(token)
    if(validacion.status==1){
        mandar.status(403).json({message:'Acceso denegado por token expirado'});
    }else if(validacion.status==2){
        mandar.status(403).json({message:'El acceso no es un token valido'})
    }else{
        const {idTarea}=recibido.params
        const tarea= recibido.body
        console.log({...tarea,idTarea});
        actualizarTarea(connection,{descripcion:tarea.descripcion,status:tarea.status,idTarea:idTarea},
            (err,resp)=>{
                if(err){
                    mandar.status(500).json({message:err.message || 'Nose pudo actualizar'});//error en servidor
                }else{
                    mandar.status(200).json(resp);
                }
            })
        
    }
})
tareas.delete('/:idTarea',(recibido,mandar)=>{
    const token=recibido.headers['authorization']
    //const id=req.params.id; //const {id}=req.params
    const validacion=validateToken(token)
    console.log(validacion);
    if(validacion.status==1){
        mandar.status(403).json({message:'Acceso denegado por token expirado'});
    }else if(validacion.status==2){
        mandar.status(403).json({message:'El acceso no es un token valido'})
    }else{
        const {idTarea}=recibido.params
        eliminarTarea(connection,idTarea,
            (err,resp)=>{
                if(err){
                    mandar.status(500).json({message:err.message || 'Nose pudo eliminar'});//error en servidor
                }else{
                    mandar.status(200).json(resp);
                }
            })
        
    }
})

module.exports=tareas
