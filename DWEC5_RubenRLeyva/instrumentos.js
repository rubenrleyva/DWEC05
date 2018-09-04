/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = iniciar;

/* 
 * En desuso ya que al tocar una nota sonaba mal y no se repetica al dejar pulsado
 * el botón.
 */
var sonidoDo = new Audio('sonidos/1 - Do3.wav');
var sonidoRe = new Audio('sonidos/3 - Re3.wav');
var sonidoMi = new Audio('sonidos/5 - Mi3.wav');
var sonidoFa = new Audio('sonidos/6 - Fa3.wav');
var sonidoSol = new Audio('sonidos/8 - Sol3.wav');
var sonidoLa = new Audio('sonidos/10 - La3.wav');
var sonidoSi = new Audio('sonidos/12 - Si3.wav');

var num; // Variable encargada del número de id de cada tecla.

// Array con los diferentes colores que pueden tener las teclas.
var arrayColores = ['#CCFF00', '#CCFFCC', '#FFFF99', '#CCCC00', '#CCCCCC', '#FFCC99', '#CC9900', '#CC99CC', '#FF9999', '#CC6600', '#CC66CC', '#660000', '#6600CC'];

// Array con los sonidos
var arrayNotas = [sonidoDo, sonidoRe, sonidoMi, sonidoFa, sonidoSol, sonidoLa, sonidoSi];

// La variable encargada del muteo del sonido de la aplicación.
var mute = false;

// Variable encargada de la elección entre el teclado y el ratón.
var teclado = false;

// Variable que contiene las diferentes teclas para uso del teclado.
var teclas = document.getElementsByName("teclas");
var raton = document.getElementsByName("teclas");

// Comenzamos los colores del teclado
var colorines = setInterval(function(){coloresAleatorios();}, 500);

/**
 * Función que contiene el inicio de la aplicación.
 */
function iniciar(){

    // Creamos las estructura
    estructuraHTML();

    // Recorremos la variable teclas
    for (i = 0; i < teclas.length; i++)
    {   
        // En caso de pulsa el teclado vamos a la función tocar.
        teclas[i].addEventListener('keydown', tocar, false);
        
        // En caso de pulsa el teclado vamos a la función tocar. NO FUNCIONA
        //teclas[i].addEventListener('keypress', tocar, false);
        
        // En caso de que se levante la tecla vamos a la funcuón limpiar
        teclas[i].addEventListener('keyup', limpiar, false);    
    }
    
    // Variable que contiene las diferentes teclas para uso del ratón.
    //var raton = document.getElementsByName("teclas");
    if(!teclado){

        // Recorremos la variable ratón 
        for (i = 0; i < raton.length; i++)
        {   
            // En caso de pulsar con el ratón en una de las teclas
            raton[i].addEventListener('mousedown', function(){

                // Recogemos la id de dicha tecla
                num = parseInt(this.id);

                // Cambiamos el color de dicha tecla.
                //document.getElementById(num).style.backgroundColor = '#CCCC33';

                // Vamos a lafunción tocar pasándole el número de tecla.
                tocar(num);

            }, false);

            // En caso de levantar el botón pulsado anteriormente
            raton[i].addEventListener('mouseup', function(){

                // Iniciamos los colores aletorios al pasar cinco segundos.
                //setTimeout(function(){coloresAleatorios();},5000);
                parar(num);
                document.getElementById(num).style.backgroundColor = 'yellow';
            }, false);
        }
    }
    
    // Capturamos el evento en caso de que se pulse sobre el botón mute
    document.getElementById("botonmute").addEventListener('click', function(){
        
        // Si mute es true
        if(mute)
        {
            // convertimos mute a false.
            mute = false;
            
            // y quitamos el color de fondo al botón
            document.getElementById("botonmute").style.backgroundColor = '';
            
            // Cambio el foco a una de las teclas para que funcione sin tener que tocar con el ratón sobre ella.
            document.getElementById('0').focus(); 
        }
        else // en caso contrario
        {
            // convertimos mute a true
            mute = true;
            
            // y le damos un color al fondo del botón mute.
            document.getElementById("botonmute").style.backgroundColor = '#CCCC33';
            
            // Cambio el foco a una de las teclas para que funcione sin tener que tocar con el ratón sobre ella.
            document.getElementById('0').focus(); 
        }
    });
    
    // Capturamos el evento en caso de que se pulse sobre el botón elección (para elegir entre teclado y ratón)
    document.getElementById("botoneleccion").addEventListener('click', function(){
        
        // Paramos el setInterval
        clearInterval(colorines);
        
        // En caso de que la variable teclado sea true
        if(teclado)
        {
            // cambiamos la variable a false.
            teclado = false;
            
            // y cambiamos el nombre del botón a Ratón.
            document.getElementById("botoneleccion").setAttribute('value', 'Ratón');
           
        }
        else // en caso contrario
        {
            // cambiamos la varible a true
            teclado = true;
            
            // y cambiamos el nombre del botón a Teclado.
            document.getElementById("botoneleccion").setAttribute('value', 'Teclado');
            
            // Cambio el foco a una de las teclas para que funcione sin tener que tocar con el ratón sobre ella.
            document.getElementById('0').focus(); 
        }
        
        // Comenzamos los colores del teclado
        colorines = setInterval(function(){coloresAleatorios();}, 500);
    }); 
}

/**
 * Función encargada de cambiar los colores a las teclas.
 */
function coloresAleatorios(){
    
    // Recorremos la variable teclas
    for (i = 0; i < teclas.length; i++)
    {   
        // Vamos a escogiendo un color al azar del array de colores que tenemos.
        var color = arrayColores[Math.floor(Math.random() * arrayColores.length)];
            
        // Cambiamos el color de la tecla.
        document.getElementById(i).style.backgroundColor = color; 
    }
}

/**
 * Función encargada de tocar lás diferentes notas
 * @param {type} numero
 */
function tocar(numero){
    
    
    // Enc aso de no estar muteado
    if(!mute)
    {
        // En caso de que no sea el telcado
        if(!teclado)
        {   
            
            // Paramos el setInterval
            clearInterval(colorines);
            
            // Recorremos el array de las notas
            for(i = 0; i < arrayNotas.length; i++)
            {    
                // Si coincide la tecla tocada con la nota del array
                if(numero === i)
                {
                    document.getElementById(numero).style.backgroundColor = '#CCCC33';
                    arrayNotas[i].pause(); // Pausamos la nota
                    arrayNotas[i].currentTime = 0; // La devolvemos al comienzo
                    arrayNotas[i].play(); // La reproducimos
                }  
            }  
            
        // en caso de que la elección sea teclado    
        }else{
            
            // Paramos el setInterval
            clearInterval(colorines);

            if (numero.keyCode === 65){  // Código de la tecla A
                
                // Cambiamos el color de fondo de la tecla
                document.getElementById('0').style.backgroundColor = '#CCCC33';
                
                
                sonidoDo.pause(); // Pausamos la nota
                sonidoDo.currentTime = 0; // La devolvemos al comienzo
                sonidoDo.play(); // La reproducimos
            }
            
            if (numero.keyCode === 83){  // Código de la tecla S
                
                // Cambiamos el color de fondo de la tecla
                document.getElementById('1').style.backgroundColor = '#CCCC33';
                
                sonidoRe.pause(); // Pausamos la nota
                sonidoRe.currentTime = 0; // La devolvemos al comienzo
                sonidoRe.play(); // La reproducimos
            }
            
            if (numero.keyCode === 68){  // Código de la tecla D
                
                // Cambiamos el color de fondo de la tecla
                document.getElementById('2').style.backgroundColor = '#CCCC33';
                
                sonidoMi.pause(); // Pausamos la nota
                sonidoMi.currentTime = 0; // La devolvemos al comienzo
                sonidoMi.play(); // La reproducimos
            }
            
            if (numero.keyCode === 70){  // Código de la tecla F

                // Cambiamos el color de fondo de la tecla
                document.getElementById('3').style.backgroundColor = '#CCCC33';
                
                sonidoFa.pause(); // Pausamos la nota
                sonidoFa.currentTime = 0; // La devolvemos al comienzo
                sonidoFa.play(); // La reproducimos
            }
            
            if (numero.keyCode === 71){  // Código de la tecla G

                // Cambiamos el color de fondo de la tecla
                document.getElementById('4').style.backgroundColor = '#CCCC33';
                
                sonidoSol.pause(); // Pausamos la nota
                sonidoSol.currentTime = 0; // La devolvemos al comienzo
                sonidoSol.play(); // La reproducimos
            }
            
            if (numero.keyCode === 72){  // Código de la tecla H

                // Cambiamos el color de fondo de la tecla
                document.getElementById('5').style.backgroundColor = '#CCCC33';
                
                sonidoLa.pause(); // Pausamos la nota
                sonidoLa.currentTime = 0; // La devolvemos al comienzo
                sonidoLa.play(); // La reproducimos
            }
            
            if (numero.keyCode === 74){  // Código de la tecla J
                
                // Cambiamos el color de fondo de la tecla
                document.getElementById('6').style.backgroundColor = '#CCCC33';
                
                //sonidoSi.pause(); // Pausamos la nota
                sonidoSi.currentTime = 0; // La devolvemos al comienzo
                sonidoSi.play(); // La reproducimos
            }
        }
    }
}

/**
 * Función para parar la nota al levantar la tecla o botón del ratón.
 * 
 * @param {type} numero
 */
function parar(numero){

    for(i = 0; i < arrayNotas.length; i++)
    {    
        if(numero === i)
        {
            arrayNotas[i].pause();
                    
        }  
    }   
}

/**
 * Función utilizada para limpiar el fondo al soltar el botón en cuestión.
 * @param {type} evt Evento con el botón pulsado
 */
function limpiar(evt){
    
    if (evt.keyCode === 65){  // Código de la tecla A
        
        // Le damos color al fondo
        document.getElementById("0").style.backgroundColor = 'yellow';
        sonidoDo.pause(); // Pausamos la nota
    }
    
    if (evt.keyCode === 83){  // Código de la tecla S
        
        // Le damos color al fondo
        document.getElementById("1").style.backgroundColor = 'yellow';
        sonidoRe.pause(); // Pausamos la nota

    }
    
    if (evt.keyCode === 68){  // Código de la tecla D
        
        // Le damos color al fondo
        document.getElementById("2").style.backgroundColor = 'yellow';
        sonidoMi.pause(); // Pausamos la nota
    }
    
    if (evt.keyCode === 70){  // Código de la tecla F
        
        // Le damos color al fondo
        document.getElementById("3").style.backgroundColor = 'yellow';
        sonidoFa.pause(); // Pausamos la nota
    }
    
    if (evt.keyCode === 71){  // Código de la tecla G
        
        // Le damos color al fondo
        document.getElementById("4").style.backgroundColor = 'yellow';
        sonidoSol.pause(); // Pausamos la nota
    }
    
    if (evt.keyCode === 72){  // Código de la tecla H
        
        // Le damos color al fondo
        document.getElementById("5").style.backgroundColor = 'yellow';
        sonidoLa.pause(); // Pausamos la nota
    }
    
    if (evt.keyCode === 74){  // Código de la tecla J
        
        // Le damos color al fondo
        document.getElementById("6").style.backgroundColor = 'yellow';
        sonidoSi.pause(); // Pausamos la nota
    }
}

/**
 * Función encargada de crear la estructura HTML
 */
function estructuraHTML(){
    
    
    /* Creación de la cabecera */
    var cabecera = document.createElement('div'); // Creamos el elemento div que contendrá la cabecera.
    var textoCabecera = document.createElement('h1'); // Creamos un elemento de tipo h1.
    var textoTitulo = document.createTextNode('Organillo Musical'); // Creamos el título.
    
    cabecera.setAttribute('id', 'cabecera'); // Le asignamos un id de nombre cabecera.
    cabecera.setAttribute('align', 'center'); // Le asignamos un atributo de estilo.
    
    // Le damos estilos de otra forma diferente a la anteriormente vista.
    cabecera.style.width = "900px";
    cabecera.style.height = "100px";
    cabecera.style.margin = "0 auto";
    
    document.body.appendChild(cabecera); // Creamos la cabecera en el body.
    
    cabecera.appendChild(textoCabecera); // Le pasamos dicho elemento a la cabecera.
    textoCabecera.appendChild(textoTitulo); // Le pasamos el título al elelemnto h1.
    
    /* Creamos un div que contendrá los diferentes elementos */
    var contenido = document.createElement('div'); 
    
    contenido.setAttribute('id', 'contenido'); // Le asignamos un id de nombre contenido.
    contenido.setAttribute('align', 'center'); // Le asignamos un atributo de estilo.
    
    // Le damos diferentes estilos al contenido
    contenido.style.width = "900px";
    contenido.style.height = "250px";
    contenido.style.margin = "0 auto";
    contenido.style.background = "#FF0000";
    contenido.style.borderRadius = "20px";
    
    document.body.appendChild(contenido); // Creamos el contenido en el body.
    
    /* Creamos un div que contendrá los diferentes elementos */
    var instrucciones = document.createElement('div'); 
    
    instrucciones.setAttribute('id', 'contenido'); // Le asignamos un id de nombre contenido.
    instrucciones.setAttribute('align', 'center'); // Le asignamos un atributo de estilo.
    
    // Le damos diferentes estilos al contenido
    instrucciones.style.width = "150px";
    instrucciones.style.height = "100px";
    instrucciones.style.float = "left";
    instrucciones.style.margin = "50px";
    instrucciones.style.background = "white";
    
    var textoIntrucciones = document.createTextNode('Si quieres tocar con el teclado utiliza las teclas: A S D F G H J'); // Texto con las distintas notas
    
    instrucciones.appendChild(textoIntrucciones);
    
    contenido.appendChild(instrucciones); // Creamos el organillo en el contenido.
    
    /* Creación del contenido(el organillo musical) */
    var organillo = document.createElement('div'); // Creamos el elemento div que contendrá el organillo.
    organillo.style.width = "550px";
    //organillo.style.height = "400px";
    organillo.style.float = "left";
    organillo.style.margin = "20px 0";
    //organillo.style.background = "blue";
    organillo.style.justifyContent = "space-between";
    contenido.appendChild(organillo); // Creamos el organillo en el contenido.
    
    
    /* Creación del pie de la página */
    var pie = document.createElement('div'); // Creamos el elemento div que contendrá el pie
    var textoPie = document.createElement('h2'); // Creamos un elemento de tipo h2
    var textoTitulo = document.createTextNode('Rubén Ángel Rodriguez Leyva'); // Creamos el texto del pie
    
    pie.setAttribute('id', 'pie'); // Le asignamos un id de nombre pie.
    pie.setAttribute('align', 'center'); // Le asignamos un atributo de estilo.
    
    // Le damos diferentes estilos al pie
    pie.style.width = "900px";
    pie.style.height = "100px";
    pie.style.margin = "50px auto";
    
    document.body.appendChild(pie); // Creamos el pie en el body
    
    textoPie.setAttribute('align', 'center'); // Le asignamos un atributo de estilo
    
    pie.appendChild(textoPie); // Le pasamos dicho elemento al pie
    
    textoPie.appendChild(textoTitulo); // Le pasamos el título al elelemnto h2
    
    /* Creación de las diferentes teclas */
    var teclaDo = document.createElement('input');
    var teclaRe = document.createElement('input');
    var teclaMi = document.createElement('input');
    var teclaFa = document.createElement('input');
    var teclaSol = document.createElement('input');
    var teclaLa = document.createElement('input');
    var teclaSi = document.createElement('input');
    
    // Tecla DO
    teclaDo.setAttribute('type', 'button');
    teclaDo.setAttribute('id','0');
    teclaDo.setAttribute('name','teclas');
    teclaDo.nodeValue="DO";
    teclaDo.style.display = "inline-block";
    teclaDo.style.width = "75px";
    teclaDo.style.height = "200px";
    teclaDo.style.background = "yellow";
    teclaDo.style.borderBottomRightRadius = "25px";
    teclaDo.style.border = "solid";
    teclaDo.style.borderBottomColor = "#000000";
    organillo.appendChild(teclaDo);
    
    // Tecla RE
    teclaRe.setAttribute('type', 'button');
    teclaRe.setAttribute('id','1');
    teclaRe.setAttribute('name','teclas');
    teclaRe.nodeValue="RE";
    teclaRe.style.display = "inline-block";
    teclaRe.style.width = "75px";
    teclaRe.style.height = "200px";
    teclaRe.style.background = "yellow";
    teclaRe.style.borderBottomRightRadius = "25px";
    teclaRe.style.border = "solid";
    teclaRe.style.borderBottomColor = "#000000";
    organillo.appendChild(teclaRe);
    
    // Tecla MI
    teclaMi.setAttribute('type', 'button');
    teclaMi.setAttribute('id','2');
    teclaMi.setAttribute('name','teclas');
    teclaMi.nodeValue="MI";
    teclaMi.style.display = "inline-block";
    teclaMi.style.width = "75px";
    teclaMi.style.height = "200px";
    teclaMi.style.background = "yellow";
    teclaMi.style.borderBottomRightRadius = "25px";
    teclaMi.style.border = "solid";
    teclaMi.style.borderBottomColor = "#000000";
    organillo.appendChild(teclaMi);
    
    // Tecla FA
    teclaFa.setAttribute('type', 'button');
    teclaFa.setAttribute('id','3');
    teclaFa.setAttribute('name','teclas');
    teclaFa.nodeValue="FA";
    teclaFa.style.display = "inline-block";
    teclaFa.style.width = "75px";
    teclaFa.style.height = "200px";
    teclaFa.style.background = "yellow";
    teclaFa.style.borderBottomRightRadius = "25px";
    teclaFa.style.border = "solid";
    teclaFa.style.borderBottomColor = "#000000";
    organillo.appendChild(teclaFa);
    
    // Tecla SOL
    teclaSol.setAttribute('type', 'button');
    teclaSol.setAttribute('id','4');
    teclaSol.setAttribute('name','teclas');
    teclaSol.nodeValue="SOL";
    teclaSol.style.display = "inline-block";
    teclaSol.style.width = "75px";
    teclaSol.style.height = "200px";
    teclaSol.style.background = "yellow";
    teclaSol.style.borderBottomRightRadius = "25px";
    teclaSol.style.border = "solid";
    teclaSol.style.borderBottomColor = "#000000";
    organillo.appendChild(teclaSol);
    
    // Tecla LA
    teclaLa.setAttribute('type', 'button');
    teclaLa.setAttribute('id','5');
    teclaLa.setAttribute('name','teclas');
    teclaLa.nodeValue="LA";
    teclaLa.style.display = "inline-block";
    teclaLa.style.width = "75px";
    teclaLa.style.height = "200px";
    teclaLa.style.background = "yellow";
    teclaLa.style.borderBottomRightRadius = "25px";
    teclaLa.style.border = "solid";
    teclaLa.style.borderBottomColor = "#000000";
    organillo.appendChild(teclaLa);
    
    // Tecla SI
    teclaSi.setAttribute('type', 'button');
    teclaSi.setAttribute('id','6');
    teclaSi.setAttribute('name','teclas');
    teclaSi.nodeValue="SI";
    teclaSi.style.display = "inline-block";
    teclaSi.style.width = "75px";
    teclaSi.style.height = "200px";
    teclaSi.style.background = "yellow";
    teclaSi.style.borderBottomRightRadius = "25px";
    teclaSi.style.border = "solid";
    teclaSi.style.borderBottomColor = "#000000";
    organillo.appendChild(teclaSi);
    
    /* Creación del botón mute */
    var botonMute = document.createElement('input');
    botonMute.setAttribute('type','button');
    botonMute.setAttribute('id','botonmute');
    botonMute.setAttribute('value','MUTE');
    botonMute.style.margin = "20px";
    botonMute.style.width = "150px";
    botonMute.style.align = "center";
    contenido.appendChild(botonMute);
    
    /* Creación del botón mute */
    var botonEleccion = document.createElement('input');
    botonEleccion.setAttribute('type','button');
    botonEleccion.setAttribute('id','botoneleccion');
    botonEleccion.setAttribute('value','Ratón');
    botonEleccion.style.width = "150px";
    botonEleccion.style.align = "center";
    contenido.appendChild(botonEleccion);
    
}