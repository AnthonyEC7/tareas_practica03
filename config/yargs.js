//Creamos la constante descripcion que nos permitirá saber su alias, su descripcion 
// y si es obligatoria

const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea'

};



//Creamos la constante completado que nos permitirá saber su alias, su descripcion 
// y si es obligatoria o por defecto
const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado (true) o pendiente la tarea (false)'
};

//creamos la constante yargs para utilizarla posteriormente.
const argv = require('yargs')

//Creacion del comando crear para crear una tarea
.command('crear', 'Crear una tarea', {
        descripcion
    })
    //Creacion del comando actualizar para actualizar una tarea creada
    .command('actualizar', 'actualizar una tarea', {
        descripcion,
        completado
    })
    //Creacion del comando borrar para borrar una tarea creada
    .command('borrar', 'borrar una tarea', {
        descripcion
    })
    //Creacion del comando listar para listar las tareas creada
    .command('listar', 'borrar una tarea', {
        completado
    }).help().argv;

// Realizamos la exportación de los modulos para utilizarlos 
// en otra clase.
module.exports = {
    argv
}