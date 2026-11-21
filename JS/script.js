// Elementos de la página
const botonSalir = document.getElementById("boton-salir");
const botonEntrar = document.getElementById("boton-entrar");

const portada = document.getElementById("portada");
const sorpresa = document.getElementById("sorpresa");
const sitio = document.getElementById("sitio");

const audioSorpresa = document.getElementById("audio-sorpresa");

// Música de fondo
const botonSonido = document.getElementById("boton-sonido");
const musicaFondo = document.getElementById("musica-fondo");
let sonidoEncendido= false;

// Controlar música con el botón

botonSonido.addEventListener("click",function() {
    sonidoEncendido = !sonidoEncendido;

    if (sonidoEncendido) {
        botonSonido.textContent = "🔊";
        botonSonido.setAttribute("aria-label", "Apagar música");

        musicaFondo.play().catch(function(error){
            console.log("No se pudo reproducir la música");
        });
    }else{
        botonSonido.textContent = "🔇";
        botonSonido.setAttribute("aria-label", "Encender música");

        musicaFondo.pause();
    }
});

// Ventana personalizada para salir
const modalSalir = document.getElementById("modal-salir");
const cancelarSalida = document.getElementById("cancelar-salida");
const confirmarSalida = document.getElementById("confirmar-salida");
const avisoSalida = document.getElementById("aviso-salida");

// Abrir ventana 
botonSalir.addEventListener("click", function (){
    modalSalir.hidden = false;
});

//Opción quedarse
cancelarSalida.addEventListener("click", function(){
    modalSalir.hidden = true;
});

// Opción salir
confirmarSalida.addEventListener("click", function(){
    avisoSalida.hidden = false;
    window.close();
});

// Botón Entrar
botonEntrar.addEventListener("click",function() {
    portada.hidden = true;
    sorpresa.hidden = false;

    // Reproducir audio de la sorpresa
    audioSorpresa.currentTime = 0;
    audioSorpresa.play();

    // Mostrar la página principal después de 5 segundos
    setTimeout(function(){
        sorpresa.hidden = true;
        sitio.hidden = false;

        // Iniciar la música de fondo
        sonidoEncendido = true;
        botonSonido.textContent = "🔊";
        botonSonido.setAttribute("aria-label", "Apagar música");

        musicaFondo.currentTime = 0;
        musicaFondo.play().catch(function(error){
            sonidoEncendido= false;
            botonSonido.textContent = "Sonido: APAGADO";
            crossOriginIsolated.log("No se pudo iniciar la música automáticamente");
        });

    }, 5000);
});

// Fotografías de cada persona
const fotosPersonas = {
    papa: [
        "multimedia/album/papa/fotos/foto-papa1.jpg",
    ],
    mama:[
        "multimedia/album/mama/fotos/foto-mama1.jpg",
    ],
    hermana:[
        "multimedia/album/hermana/fotos/foto-hermana1.jpg",
    ],
    yo:[
        "multimedia/album/novio/fotos/foto-novio1.jpg",
        "multimedia/album/novio/fotos/foto-novio2.jpg",
        "multimedia/album/novio/fotos/foto-novio3.jpg",
        "multimedia/album/novio/fotos/foto-novio4.jpg",
        "multimedia/album/novio/fotos/foto-novio5.jpg",
    ],
};

// Álbumes de recuerdos
const tarjetasPersona = document.querySelectorAll(".tarjeta-persona");

const modalAlbum = document.getElementById("modal-album");
const cerrarAlbum = document.getElementById("cerrar-album");
const tituloAlbum = document.getElementById("titulo-album");

// Elementos del visor de fotografías
const visorFotos = document.getElementById("visor-fotos");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const cerrarVisor = document.getElementById("cerrar-visor");
const fotoAnterior = document.getElementById("foto-anterior");
const fotoSiguiente = document.getElementById("foto-siguiente");

// Control de la fotografía actual
let fotosActuales= [];
let indiceFotoActual= 0;

// Abrir fotografía en el visor
function mostrarFoto(indice){
    indiceFotoActual = indice;

    imagenAmpliada.src = fotosActuales[indiceFotoActual];

    visorFotos.hidden = false;
}

// Mostrar la foto anterior
function anteriorFoto(){
    if (fotosActuales.length === 0) return;
    if(indiceFotoActual > 0){
        mostrarFoto(indiceFotoActual -1);
    }else{
        mostrarFoto(fotosActuales.length -1);
    }
}

// Mostrar la siguiente foto
function siguienteFoto(){
    if(fotosActuales.length === 0) return;
    if(indiceFotoActual < fotosActuales.length -1){
        mostrarFoto(indiceFotoActual +1);
    }else{
        mostrarFoto(0)
    }
}

// Botones para cambiar de fotografía
fotoAnterior.addEventListener("click", anteriorFoto);

fotoSiguiente.addEventListener("click",siguienteFoto);

// Cerrar el visor con el botón
cerrarVisor.addEventListener("click", function(){
    visorFotos.hidden = true;
});

// Cerrar el visor al pulsar fuera de la fotografía
visorFotos.addEventListener("click",function(event){
    if(event.target === visorFotos){
    visorFotos.hidden= true;
    }
});

//Controles del teclado
document.addEventListener("keydown",function(event){
    if (event.key ==="Escape"){
        if(!visorFotos.hidden){
            visorFotos.hidden= true;
        }
        else if (!modalAlbum.hidden){
            modalAlbum.hidden= true;
        }
    }
    if(!visorFotos.hidden){
        if(event.key==="ArrowLeft"){
            anteriorFoto();
        }
        if(event.key === "ArrowRight"){
            siguienteFoto();
        }
    }
});

// Abrir el Álbum de la persona elegida
tarjetasPersona.forEach(function(tarjeta){
    tarjeta.addEventListener("click", function(){
        const persona = tarjeta.dataset.persona;

        tituloAlbum.textContent = "Recuerdos con " + tarjeta.querySelector("h3").textContent;
        // Obtener las fotografías de esa persona
        const fotos = fotosPersonas[persona];

        // Mostrar las fotografías
        const contenedorFotos = document.getElementById("fotos-album");

        contenedorFotos.innerHTML = "";

        if(fotos.length === 0){
            contenedorFotos.textContent = "Próximamente encontrarás muchos recuerdos aquí...";
        }
        else {
            fotosActuales = fotos;

            fotos.forEach(function(rutaFoto,indice){
                const imagen = document.createElement("img");

                imagen.src = rutaFoto;
                imagen.alt = "Recuerdo de Isabela";

                imagen.addEventListener("click",function(){
                    mostrarFoto(indice);
                });

                contenedorFotos.appendChild(imagen);
            });
        }
        
        modalAlbum.hidden = false;
    });
});

// Cerrar el Álbum
cerrarAlbum.addEventListener("click", function(){
    modalAlbum.hidden= true;
});

modalAlbum.addEventListener("click",function(event) {
    if (event.target === modalAlbum){
        modalAlbum.hidden= true
    }
});

// Fotografías de la galería general
const fotosGaleria = document.querySelectorAll(".foto-galeria img");

const rutasGaleria = Array.from(fotosGaleria).map(function(foto){
    return foto.src;
});
fotosGaleria.forEach(function(foto, indice){
    foto.addEventListener("click", function(){
        fotosActuales = rutasGaleria;
        mostrarFoto(indice);
    });
});

// Recuerdos adicionales con amigos
const tarjetaRecuerdosAmigos = document.getElementById("abrir-recuerdos-amigos");
const modalRecuerdosAmigos = document.getElementById("modal-recuerdos-amigos");
const cerrarRecuerdosAmigos = document.getElementById("cerrar-recuerdos-amigos");
const contenedorFotosAmigos = document.getElementById("fotos-recuerdos-amigos");

const fotosAmigos = [
    "multimedia/galeria/amigos/foto-amigos1.jpg",
    "multimedia/galeria/amigos/foto-amigos2.jpg",
    "multimedia/galeria/amigos/foto-amigos3.jpg",
    "multimedia/galeria/amigos/foto-amigos4.jpg",
    "multimedia/galeria/amigos/foto-amigos5.jpg",
    "multimedia/galeria/amigos/foto-amigos6.jpg",
    "multimedia/galeria/amigos/foto-amigos7.jpg",
    "multimedia/galeria/amigos/foto-amigos8.jpg",
];

tarjetaRecuerdosAmigos.addEventListener("click", function(){
    contenedorFotosAmigos.innerHTML = "";
    fotosActuales = fotosAmigos;

    fotosAmigos.forEach(function(rutaFoto, indice){
        const imagen = document.createElement("img");
        imagen.src = rutaFoto;
        imagen.alt = "Recuerdo de Isa con sus amigos";

        imagen.addEventListener("click", function(){
            mostrarFoto(indice);
        });

        contenedorFotosAmigos.appendChild(imagen);
    });
    modalRecuerdosAmigos.hidden= false;
});

cerrarRecuerdosAmigos.addEventListener("click", function(){
    modalRecuerdosAmigos.hidden= true;
});

modalRecuerdosAmigos.addEventListener("click", function(event){
    if (event.target === modalRecuerdosAmigos){
        modalRecuerdosAmigos.hidden = true;
    }
});

// Ventana dedicatorias
const tarjetasMensaje = document.querySelectorAll(".tarjeta-mensaje");

const modalMensaje = document.getElementById("modal-mensaje");
const cerrarMensaje = document.getElementById("cerrar-mensaje");
const tituloMensaje = document.getElementById("titulo-mensaje");
const textoMensaje = document.getElementById("texto-mensaje");

// Contenido de las dedicatorias
const mensajes = {
    papa: {
        titulo: "Para Isabela, con cariño de papá",
        texto: "Aquí va el mensaje"
    },

    mama: {
        titulo: "Para mi amor chiquito",
        audio: "multimedia/album/mama/audio/audio-mama.ogg"
    },

    hanna: {
        titulo: "Para mi hermana querida",
        texto: "Mensaje"
    },

    angel: {
        titulo: "Para el amor de mi vida",
        texto: "Feliz cumpleaños mi Isa, espero que los cumplas muy feliz y que te vaya muy bien toda tu vida. Muchas gracias por hacer mis días más dulces y traer a mi vida mucha felicidad y luz. ¡TE AMO BABY!"
    },

    amigos: {
        titulo: "Mensajes de las personas que te quieren",
        mensajes: [
            {
                nombre: "Camilo López",
                texto: "Holaaaa!!! Espero que tengas un gran día, que nunca te falte la energía ni la potencia para que todo salga de la mejor manera. Te deseo muchos éxitos en todo lo que te propongas y espero que sigas cumpliendo muchos años más rodeada de personas que te aprecian. Disfruta mucho tu día y pásala increíble."
            },

            {
                nombre: "Rihanna",
                texto: "Hola isa espero estés muy bien, quiero desearte un feliz cumpleaños y que cumplas muchos más, hace mucho no tenemos contacto pero me hace feliz recordar los momentos que compartimos con el grupo juntas, que Dios te bendiga siempre y cumplas tus metas. Con mucho cariño Rihanna ❤️"
            },

            {
                nombre: "Hanna",
                texto:`Hola mi Isaaa, como me le va?, espero que bien mujer.
                Soy Hanna hehehe, Feliz cumpleaños 😭😭💗, recuerda que eres increíble y que tu puedes con todo, nunca dejes de luchar por lo que quieres.
                Con cariño Hanna🥀`
            },

            {
                nombre: "Johan",
                texto:  `Feliz cumpleaños isa
De verdad me hace muy feliz haberte conocido. No eres una amiga tan cercana pero me llena de mucho sentimiento saber que la vida me permitió coincidir contigo. Eres una gran persona y sobretodo una muy buena amiga.

Deseo que Dios bendiga siempre, que te permita cumplir tus sueños y que nunca te falten motivos para salir adelante. Quiero verte crecer, triunfar y lograr todo lo que te propongas. Se que eres una persona muy capaz y que vas a llegar muy lejos. Y de mi parte, quiero que sepas que me gustaría ser una ayuda y un apoyo para ti siempre que lo necesites.

Te deseo toda la felicidad del mundo. Gracias por ser parte de mi vida, se te quiere muchísimo.`
            },

            {
                nombre: "Tania",
                texto: `Isa, quería desearte un muy, muy feliz cumpleaños 💗. Aunque actualmente no seamos tan cercanas, hubo una época en el colegio en la que compartimos momentos y por eso, no quería dejar pasar este día sin desearte cosas bonitas.
Espero de corazón que todos tus deseos se hagan realidad, que cada meta que te propongas puedas alcanzarla y que esta nueva vuelta al sol esté llena de alegrías, oportunidades y momentos especiales. Que la vida te regale muchas razones para sonreír y que siempre te vaya muy bonito en todo lo que hagas, feliz cumpleaños!! (⁠灬⁠º⁠‿⁠º⁠灬⁠)⁠♡`
            },

            {
                nombre: "Julián",
                texto: 'Feliz cumpleaños Isabela espero que lo pases muy bien que te diviertas para mí eres una muy buena amiga aunque ya no hablemos mucho tu eres de esas personas que cuando me acuerdo del colegio se me viene a la mente de nuevo espero que te vaya bien que disfrutes tu cumpleaños 🎂'
            }
        ]
    }
};

// Abrir las dedicatorias
tarjetasMensaje.forEach(function(tarjeta){
    tarjeta.addEventListener("click", function(){
        const persona= tarjeta.dataset.mensaje;
        const mensaje = mensajes[persona];

        if (!mensaje) return;

        tituloMensaje.textContent = mensaje.titulo;
        textoMensaje.innerHTML = "";

        if (persona === "amigos") {
            mensaje.mensajes.forEach(function(amigo){
                const bloque = document.createElement("div");
                bloque.classList.add("mensaje-amigo");

                const nombre = document.createElement("h3");
                nombre.textContent = amigo.nombre;

                const texto = document.createElement("p");
                texto.textContent = amigo.texto;

                bloque.appendChild(nombre);
                bloque.appendChild(texto);
                textoMensaje.appendChild(bloque);
            });

        }else if (mensaje.audio){
            const reproductor = document.createElement("audio");
            reproductor.controls = true;
            reproductor.preload = "metadata";
            reproductor.src = mensaje.audio;
            
            // Pausar la música de fondo mientras suena el audio
            reproductor.addEventListener("play", function(){
                if (!musicaFondo.paused){
                    reproductor.dataset.musicaEstabaSonando = "true";
                    musicaFondo.pause();
                }
            });

            // Reaundar la música cuando termine el audio
            reproductor.addEventListener("ended", function(){
                if (reproductor.dataset.musicaEstabaSonando === "true" && sonidoEncendido){
                    musicaFondo.play().catch(function(){
                        console.log("No se pudo reanudar la música de fondo.")
                    });
                }
            });
            textoMensaje.appendChild(reproductor);    
        
        }else {
            textoMensaje.textContent = mensaje.texto;
        }

        modalMensaje.hidden = false;
    });
});

// Cerrar las dedicatorias
cerrarMensaje.addEventListener("click",function(){
    modalMensaje.hidden = true;
});

// Cerrar al pulsar fuera de la ventana
modalMensaje.addEventListener("click",function(event){
    if (event.target === modalMensaje) {
        modalMensaje.hidden = true;
    }
});

// Cerrar con Escape
document.addEventListener("keydown",function(event){
    if (event.key === "Escape" && !modalMensaje.hidden){
        modalMensaje.hidden = true;
    }
});