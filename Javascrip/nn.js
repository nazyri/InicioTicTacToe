// function refrescarJuego() {
//     primerJugador = ":x:";
//     opcionesJuego = ["", "", "", "", "", "", "", "", ""];
//     texto.textContent = `${primerJugador} turno`;
//     celdasTable.forEach(cell => cell.textContent = "");
//     consola = true;
//     juegoTerminado = false;

// }function juegoPc() {
//     if (!juegoTerminado) {
//         setTimeout(() => {
//             let arregloConvertido = Array.from(celdasTable);
//             let arregloVacios = arregloConvertido.filter(celda => celda.innerHTML === "");
//             if (arregloVacios.length === 0) return; 
//             let numAleatorio = Math.floor(Math.random() * arregloVacios.length);
//             let segundoJugador = primerJugador === ":x:" ? ":o:" : ":x:";
//             refrescar(arregloVacios[numAleatorio], arregloVacios[numAleatorio].getAttribute("cellIndex"));
//             cambiarJugador();
//         }, 500);
//     }
// }

const primerTurno = "X";
const botonReiniciar = document.getElementById("botonReiniciar");
const casillas = document.getElementsByClassName("casilla");
const turno = document.getElementById("turno");
const computadora = document.getElementById("computer");
const borrar = document.getElementById("borrar");
const guardar = document.getElementById("guardar");

let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
let juegoTerminado = false;

limpiarTodo();

guardar.addEventListener("click", function () {
    agregarNombre();
});

borrar.addEventListener("click", function() {
    quitarContador(); 
});

botonReiniciar.addEventListener("click", function() {
    refrescarJuego();
});

for (let casilla of casillas) {
    casilla.addEventListener("click", function(e) {
        if (juegoTerminado) return; // Evitar movimientos si el juego terminó

        let ganoJugador = movida(e.target, turno.innerHTML);
        if (ganoJugador) {
            alert("Felicidades ganaste!");
            juegoTerminado = true; // Marcar el juego como terminado
            return;
        }

        // Verificar si hay un empate
        if (empate()) {
            alert("¡Es un empate!");
            juegoTerminado = true; // Marcar el juego como terminado
            return;
        }

        // Lógica de la computadora
        if (computadora.checked && turno.innerHTML != primerTurno) {
            let ganoComputadora = movidaDeComputadora();
            if (ganoComputadora) {
                alert("Lo siento, perdiste!");
                juegoTerminado = true; // Marcar el juego como terminado
                return;
            }

            // Verificar si hay un empate después del movimiento de la computadora
            if (empate()) {
                alert("¡Es un empate!");
                juegoTerminado = true; // Marcar el juego como terminado
            }
        }
    });
}

// Funciones
function quitarContador() {
    x.innerHTML = 0;
    o.innerHTML = 0;
}

function limpiarTodo() {
    limpiar(casillas);
    turno.innerHTML = primerTurno;
    juegoTerminado = false; // Reiniciar el estado del juego
}

function limpiar(elementos) {
    for (let elemento of elementos) {
        elemento.innerHTML = "";
    }
}

function siguienteTurno() {
    let turnoActual = turno.innerHTML;
    return (turnoActual == "O") ? "X" : "O";
}

function sonIguales(a, b, c) {
    return (a == b && b == c && a != "");
}

function hayGanador() {
    let porRevisar = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let posiciones of porRevisar) {
        let a = casillas[posiciones[0]].innerHTML;
        let b = casillas[posiciones[1]].innerHTML;
        let c = casillas[posiciones[2]].innerHTML;

        if (sonIguales(a, b, c)) {
            document.querySelector(".line").style.width = "20%"; 
            return true;
        }
    }
    return false;
}

// Nueva función para verificar si el tablero está lleno
function empate() {
    for (let casilla of casillas) {
        if (casilla.innerHTML == "") {
            return false;
        }
    }
    return true;
}

function movida(elemento, valor) {
    if (elemento.innerHTML == null || elemento.innerHTML == "") {
        elemento.innerHTML = valor;
        turno.innerHTML = siguienteTurno();

        if (hayGanador()) {
            return true;
        }
    }
    return false;
}

function movidaDeComputadora() {
    let vacias = Array.from(casillas).filter(casilla => casilla.innerHTML == "");
    if (vacias.length === 0) return false;

    let posicion = Math.floor(Math.random() * vacias.length);
    let casillaElegida = vacias[posicion];

    return movida(casillaElegida, turno.innerHTML);
}

function agregarNombre() {
    let jugador1 = document.getElementById("jugador1");
    let jugador2 = document.getElementById("jugador2");

    if (jugador1.value === '' || jugador2.value === '') {
        alert('Por favor ingrese un nombre de los jugadores');
        return;
    }

    let player = { 
        player1: jugador1.value,
        player2: jugador2.value
    };

    jugadores.push(player);
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
    jugador1.value = ''; // Limpiar input
    jugador2.value = ''; // Limpiar input
    document.getElementById("player1").innerHTML = player.player1;
    document.getElementById("player2").innerHTML = player.player2;
    guardar.style.display = "none";
}

// Nueva función para refrescar el juego
function refrescarJuego() {
    limpiarTodo(); // Limpiar el tablero
    juegoTerminado = false; // Reiniciar el estado del juego
}

// Lógica de la computadora
function juegoPc() {
    if (!juegoTerminado) {
        setTimeout(() => {
            let arregloConvertido = Array.from(casillas);
            let arregloVacios = arregloConvertido.filter(celda => celda.innerHTML === "");
            if (arregloVacios.length === 0) return; 
            let numAleatorio = Math.floor(Math.random() * arregloVacios.length);
            let segundoJugador = turno.innerHTML === "X" ? "O" : "X";
            movida(arregloVacios[numAleatorio], segundoJugador);
            cambiarJugador(); // Cambiar el turno después de la jugada
        }, 500);
    }
}
