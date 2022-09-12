let palabrita;
let cantidad_errores = 0;
let cantidad_aciertos = 0;

const palabras = [
  "manzanas",
  "perro",
  "gato",
  "oveja",
  "caramelo",
  "developer",
  "murcielago",
  "paraiso",
];

const btn = id("jugar");
const imagen = id('imagen')
const btn_letras = document.querySelectorAll("#letras button");

//click de iniciar juego
btn.addEventListener("click", iniciar);

function iniciar(event) {
  id('resultado').innerHTML="JUGANDO..";
    imagen.src='img/img0.png'
  // vuelvo invisible el btn cuando comienza el juego
  btn.disabled = true;


  //Inicializar los contadores de errores y aciertos en 0
  cantidad_errores = 0;
  cantidad_aciertos = 0;
  const parrafo = id("palabra_a_adivinar");
  //Vaciar los span cuando intento obtener palabra nuevamente
  parrafo.innerHTML = "";
  const cantidad_palabras = palabras.length;
  const valor_al_azar = obtener_random(0, cantidad_palabras);

  palabrita = palabras[valor_al_azar];
  console.log(palabrita);
  const cant_letras = palabrita.length;

  for(let i= 0; i<btn_letras.length; i++){
    btn_letras[i].disabled=false;
  }

  //me va a crear una etiqueta span vacia por cada letra que tenga mi palabra

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }
}



for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener("click", click_letras);
}

function click_letras(event) {
  const spans = document.querySelectorAll("#palabra_a_adivinar span");
  const button = event.target; //cual de todas las letras llamò a la función
  button.disabled = true; //desabilito la letra que voy tocando

  const letra = button.innerHTML.toLocaleLowerCase();
  const palabra = palabrita.toLocaleLowerCase();

  let acerto = false;
  //Ciclo que recorra la palabra y verifique si la letra existe o no en la palabra
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      //la variable i es la posicion de la letra en la palabra .
      //la coincidencia en el span que tenemos que mostrarle esta letra
      spans[i].innerHTML = letra;
      cantidad_aciertos++;
      acerto = true;
    }
  }

  if(acerto == false){
    cantidad_errores++;
    const source = `img/img${cantidad_errores}.png`;
    const imagen = id('imagen');
    imagen.src=source;
  }

  if(cantidad_errores==7){
    id('resultado').innerHTML="perdiste, la palabra era "+palabrita;
    game_over();
  }else if(cantidad_aciertos==palabrita.length){
    id('resultado').innerHTML="GANASTE !! WIIII";
    game_over();
  }

  console.log(
    "la letra " + letra + "en la palabra" + palabra + "¿existe?" + acerto);
}

function game_over(){
    for(let i = 0; i<btn_letras.length; i++){
        btn_letras[i].disabled=true;
    }

    btn.disabled = false;
}
game_over();
