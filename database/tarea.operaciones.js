module.exports.obtenerTareas=(cnx,id,callback)=>{
    cnx.query(
        `SELECT * from tareas where id_usuario=${id}`,
        (err,res)=>{
            if(err) callback(err,null);
            else callback(null,res);
        }
    )
}
module.exports.crearTareas=(cnx,body,callback)=>{
    cnx.query(
        `INSERT INTO tareas VALUES(DEFAULT,'${body.tarea}','${body.status}',${body.id})`,
        (err,res)=>{
            if(err) callback(err,null);
            else callback(null,res);
        }
    )
}

module.exports.actualizarTarea=(cnx,body,callback)=>{
    cnx.query(
        `UPDATE tareas set descripcion = '${body.descripcion}', status = '${body.status}' WHERE id_tarea=${body.idTarea}`,
        (err,res)=>{
            if(err) callback(err,null)
            else callback(null,res)
        }
    )
}

module.exports.eliminarTarea=(cnx,idTarea,callback)=>{
    cnx.query(
        `Delete from tareas where id_tarea=${idTarea}`,
        (err,res)=>{
            if(err) callback(err,null)
            else callback(null,res)
        }
    )
}