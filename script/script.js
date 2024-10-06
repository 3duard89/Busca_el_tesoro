/* si da clic en el boton "cambiar" cambia el nombre en la historia */
function cambiarNombre(){
    const span = document.getElementById("nombreParrafo");
    const nombrePlayer = document.getElementById("nombreI");
    const modalVentana = document.getElementById("modalN");
    
    span.textContent = nombrePlayer.value;
    modalVentana.style.display = "none";
}

/* me muestra el modal para nombre */
function mostrarModal(){
    const modalVentana = document.getElementById("modalN");
    modalVentana.style.display = "block";
}

//genero un evento a nombre del navbar y a el boton dentro del modal
document.getElementById("nombre").addEventListener("click", mostrarModal);
document.getElementById("cambiarNombre").addEventListener("click", cambiarNombre);

//relaciono la imagen
const mapa = document.getElementById("mapa");
//relaciono x y y de usuario globales
let xUsu;
let yUsu;

//Contadores de clicks para mostrar mensajes
let clicFrio = 0;
let clicTibio = 0;
let clicPerdido = 0;
let contadorClics = 0;

const msnNoClics = document.getElementById("mostrarClics");

//genero un evento a la imagen y guardo las coordenadas
mapa.addEventListener("click", function(e){
    contadorClics++;
    msnNoClics.innerText = `${contadorClics}`;
    xUsu = e.clientX;
    yUsu = e.clientY;

    distancia(xUsu,yUsu);
    medirDistancias();
    console.log(xUsu + " " + yUsu);
    

});


//se relaciona un msn para el jugador de juego iniciado
let iniciaMensaje = document.getElementById("iniciado");
let puntosRetos = [];

//genero puntos aleatorios del tamaño del mapa
function iniciarPuntos(puntos = 5, width = 600, height = 400){

    for(let i=0; i<puntos ; i++){
        const x = (Math.floor(Math.random()* width))+30;
        const y = (Math.floor(Math.random()* height))+155;
        puntosRetos.push(x, y);
    }
    
    iniciaMensaje.innerText = "Juego Iniciado Cuida Tus Pasos";
}


//creamos una lista para almacenar las distancias desde el click del usuario
//hasta los puntos
let distanciasRetos = [];

//se aplica la formula de la distancia entre el click y el "objeto"
function distancia(xUsuario , yUsuario){
    distanciasRetos = [];
    for(let i=0; i <= puntosRetos.length-1; i += 2){
        let d = Math.sqrt(Math.pow((xUsuario - puntosRetos[i]), 2) +  Math.pow((yUsuario - puntosRetos[i+1]), 2) );
        distanciasRetos.push(d);
    }
    console.log(distanciasRetos);
}



const mostrarRuta = document.getElementById("mostrarRuta");
const caja = document.getElementById("caja");
const msnClick = document.getElementById("msnClick");
let contadorTesoros = 0;
//mostramos un mensaje dependiendo que tan cerca esta del punto aleatorio
function medirDistancias(){

    distanciasRetos.forEach(d => {
        if(d < 20){
            contadorTesoros+=1;
            mostrarRuta.innerText = `${contadorTesoros}`;
            let x = distanciasRetos.indexOf(d)
            caja.style.top = `${yUsu-10}px`;
            caja.style.left = `${xUsu}px`;
            caja.style.display = "block";

            setTimeout(() => {
                caja.style.display = "none";
            }, 2000);

            msnClick.style.top = `${yUsu-40}px`;
            msnClick.style.left = `${xUsu-10}px`;
            msnClick.innerText = "ORO por Montones"
            msnClick.style.display ="block"

            setTimeout(() => {
                msnClick.style.display = "none";
            }, 1000);            

            puntosRetos.splice(x,2);

        }else if(d < 50){
            msnClick.style.top = `${yUsu}px`;
            msnClick.style.left = `${xUsu}px`;
            msnClick.innerText = "Tibio has encontrado una moneda de ORO"
            msnClick.style.display ="block"

            setTimeout(() => {
                msnClick.style.display = "none";
            }, 1000);

        }else if(d < 110){
            
            msnClick.style.top = `${yUsu}px`;
            msnClick.style.left = `${xUsu}px`;
            msnClick.innerText = "Frio"
            msnClick.style.display ="block"

            setTimeout(() => {
                msnClick.style.display = "none";
            }, 1000);
        }
    });

    ganaste();

    mensajesPistas();
    

}


function ReiniciarPuntos(){
    contadorClics = 0;
    contadorTesoros = 0;
    msnNoClics.innerText = `${contadorClics}`;
    mostrarRuta.innerText = "";
    iniciarPuntos();
    iniciaMensaje.innerText = "Un Nativo Movio EL TESORO";
}


const modalG = document.getElementById("modalGanar");
const mensajeG  = document.getElementById("contenedorG");
function ganaste(){
    if(puntosRetos.length == 0){
        modalG.style.display = "block";
        mensajeG.style.transform = "translateY(0px)"
        distanciasRetos = [];
        clicFrio = 0;
        clicTibio = 0;
        clicPerdido = 0;
        mostrarRuta.innerText = "";
        iniciaMensaje.innerText = "";
    }
}


function cerrarModalG(){
    modalG.style.display = "none";
}

