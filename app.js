// ANTHONY CÁRDENAS - UPS - 7MO SEMESTRE 

// DESDE AQUI SE EJECUTARÁ LA APLICACIÓN 

//Creamos una constante llamada argv que nos 
// permitirá llamar a yargs.js para utilizar sus comandos 
const argv = require('./config/yargs').argv;

//Creamos la constante tareas de la clase tareas-por-hacer que se 
//encuentra en la carpeta  (controlador)
const tareas = require('./controlador/tareas-por-hacer');

//Creamos una constante colors para cambiar los colores
//de la salida por consola
const colors = require('colors');

//Creamos la variable comando que nos 
// permitirá saber que comando el usuario desea.
let comando = argv._[0];

//Creamos la variable tarea, inicializando a tareas para poder utilizar todos sus
// metodos y atributos.
let tarea = tareas;

//Creamos el menú correspondiente al comando que el usuario ingrese
switch (comando) {

    case 'crear':

        //Aqui creamos la tarea con su descripcion correspondiente, 
        //haciendo el llamado al metodo crear
        tareas.crear(argv.descripcion);

        console.log("Crear tarea");
        break;

    case 'listar':

        var estado_true = [];
        var estado_false = [];
        //Los vectores estado true y false nos permitirán guardar las tareas 
        // que sean verdaderas y falsas respectivamente.

        console.log("Listar tarea");

        //Hacemos el llamado al metodo listar que nos retorna las tareas por hacer
        // posteriormente guardarmos en la variable lista que nos permitirá 
        // recorrer la lista y saber que tareas son true y false.
        var lista = tareas.listar();

        //Ciclo que permite recorrer las tareas

        for (var i = 0; i < lista.length; i++) {

            // Se realiza 2 comparaciones de true o 'true' debido a que puede 
            // retornar como string o boolean 
            if (lista[i].completado === 'true' || lista[i].completado === true) {

                estado_true.push(lista[i]); //Se agrega las tareas verdaderas (true)

            } else {

                estado_false.push(lista[i]); // se agrega las tareas falsas (false)
            }

        }

        // IMPRESION DE LAS TAREAS TRUE O FALSE

        if (argv.completado === true || argv.completado === 'true') {
            console.log(estado_true); //Impresion true

        } else {
            console.log(estado_false); //Impresion false
        }
        break;

    case 'actualizar':

        // Se hace el llamado al metodo actualizar que nos permite actualizar la tarea
        // y modificar el estado de la tarea
        let actualizado = tarea.actualizar(argv.descripcion, argv.completado)

        console.log(actualizado);
        break;

    case 'borrar':

        //Hacemos el llamado al metodo borrar1 que nos permite eliminar la tarea
        //creada anteriormente, basandose en la descripción.
        let borrado = tarea.eliminar(argv.descripcion)

        console.log(borrado);

        break;
    default:

        console.log('Comando no reconocido, intente con otro comando');
}