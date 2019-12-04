//Creamos la constante fs (file system) que nos permitirá manera este tipo
// de archivo

const fs = require('fs');

//Creamos una constante colors para cambiar los colores
//de la salida por consola
const colors = require('colors');

//Creamos un vector de las tareas por hacer 
let tareaPorHacer = [];

//Creamos un funcion para cargar los datos de las tareas
const cargarDB = () => {

    // Como pueden existir errores, se lo decide manejar a través de 
    // try y catch para capturar el error y continuar con la ejecución

    try {
        // Hacemos el llamado de la informacion que se encuentra en el archivo data.json
        // para guardarlo en el vector tareaPorHacer
        tareaPorHacer = require('../db/data.json');
    } catch (error) {
        // Si existe un error de informacion en el archivo el vector se guarda
        // como vacío.
        tareaPorHacer = []
    }
}

//Creamos el metodo guardarDB para almacenar la informacion de las tareas.
const guardarDB = () => {
    //Transformamos el vector en un JSON y lo guardamos en la variable data.
    let data = JSON.stringify(tareaPorHacer);

    //Escritura de la informacion de data en el archivo data.json
    fs.writeFile('db/data.json', data, (err) => {
        //Si existe un error lo manejamos con una excepcion de 
        // no poder guardar la informacion de data.
        if (err) throw new Error('No se pudo guardar', err);
    });
}

//Creamos un constante crear que recibirá como parametro la descripcion para crear la tarea
const crear = (descripcion) => {

    cargarDB(); // Llamada al metodo cargarDB

    //Creamos el vector de objetos llamado tarea que almacenará la descripcion y el estado de la tarea.
    let tarea = {
        descripcion,
        completado: false
    };

    //Guardamos en el vector la tarea ingresada
    tareaPorHacer.push(tarea);


    guardarDB(); // Guardamos la información en el archivo data.json a traves del metodo guardarDB
    return tarea;
}


//Creamos la constante listar que nos permitirá listar las tareas creadas.

const listar = () => {

    cargarDB(); // Llamada al metodo cargarDB

    return tareaPorHacer;
};

//Creamos la constante actualizar que nos permitirá modificar el estado de la tarea a true y su descripcion

const actualizar = (descripcion, completado = true) => {

    cargarDB(); // Llamada al metodo cargarDB

    // Hacemos una busqueda tipo ciclo for que retornará un valor y dicho valor nos permitirá 
    // saber si encontró la tarea o no.

    let index = tareaPorHacer.findIndex(tarea => tarea.descripcion === descripcion);


    if (index >= 0) {

        //Como el valor del index a mayor o igual a 0 nos quiere decir que 
        // si encontró la tarea y por lo tanto modificamos el estado de la misma.
        tareaPorHacer[index].completado = completado;

        guardarDB(); // Guardamos la información en el archivo data.json a traves del metodo guardarDB

        return true;
    }


    return false;
};


//Creación de una constante que eliminará la tarea.

const borrar = (descripcion) => {

    cargarDB(); // Llamada al metodo cargarDB

    // Hacemos una busqueda tipo ciclo for que retornará un valor y dicho valor nos permitirá 
    // saber si encontró la tarea o no.
    let index = tareaPorHacer.findIndex(tarea => tarea.descripcion === descripcion);


    if (index >= 0) {
        //Como el index es mayor o igual a 0 nos dice que si encontró la tarea y por lo tanto
        // a traves del metodo splice la elimina.
        tareaPorHacer.splice(index);

        guardarDB(); // Guardamos la información en el archivo data.json a traves del metodo guardarDB

        return true;
    }
    //se retorna false
    return false;
};

const eliminar = (descripcion) => {
    cargarDB(); // Llamada al metodo cargarDB

    //Buscamos que la descripcion sea distinta a la descripcion ingresada
    let nuevoListado = tareaPorHacer.filter(tarea => tarea.descripcion != descripcion);

    if (nuevoListado.length === tareaPorHacer.length) {
        // Si la longitud de las 2 son las mismas, nos dice que no encontró la descripcion
        return false;

    } else {
        tareaPorHacer = nuevoListado
        guardarDB(); // Guardamos la información en el archivo data.json a traves del metodo guardarDB

        return true;
    }
}

//Realizamos la exportacion de los modulos necesarios para su uso en otra clase.

module.exports = {
    crear,
    listar,
    actualizar,
    borrar,
    eliminar
}