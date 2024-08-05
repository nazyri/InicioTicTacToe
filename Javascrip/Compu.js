const primerTurno = "X"
const botonReiniciar = document.getElementById("botonReiniciar")
const casillas = document.getElementsByClassName("casilla")
const turno = document.getElementById("turno")
const computadora = document.getElementById("computer")
const borrar = document.getElementById("borrar")

limpiarTodo()

borrar.addEventListener("click", function() {
    quitarContador() 
})

botonReiniciar.addEventListener("click", function() {
    limpiarTodo()
})

for (let casilla of casillas) {
    casilla.addEventListener("click", function(e) {
        ganoJugador = movida(e.target, turno.innerHTML)
        if(ganoJugador) {
            alert("Felicidades ganaste!")
            if (casilla.innerHTML=="X") {
                let xJugador = parseInt(x.innerHTML);
                x.innerHTML = xJugador + 1;        
            }else{
                let oJugador = parseInt(o.innerHTML);
                o.innerHTML = oJugador + 1;
            }

            return
        }


        if(computadora.checked && turno.innerHTML != primerTurno) {
            ganoComputadora = movidaDeComputadora()
            if(ganoComputadora) {
                alert("Lo siento perdiste!")
            }            
        }
    })
}

//Funciones

function limpiarTodo() {
    limpiar(casillas)
    turno.innerHTML = primerTurno
}

function limpiar(elementos) {
    for (let elemento of elementos) {
        elemento.innerHTML = ""
    }
}

function siguienteTurno() {
    let turnoActual = turno.innerHTML

    var resultado
    if(turnoActual == "O") {
        resultado = "X"
    } else {
        resultado = "O"
    }

    return resultado
}

function sonIguales(a, b, c) {
    if(a == b && b == c && a != "") {
        return true
    } else {
        return false
    }
}

function hayGanador() {
    let porRevisar = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (posiciones of porRevisar) {
        let a = casillas[posiciones[0]].innerHTML
        let b = casillas[posiciones[1]].innerHTML
        let c = casillas[posiciones[2]].innerHTML

        if(sonIguales(a, b, c)) {

            return true
        }
    }
    return false
}

function movida(elemento, valor) {
    if (elemento.innerHTML==null||elemento.innerHTML=="") {
        
    
    elemento.innerHTML = valor
    turno.innerHTML = siguienteTurno()

    if(hayGanador()){
        return true
    }

    return false
} }

function movidaDeComputadora() {
    let vacias = Array.from(casillas).filter(casilla=>casilla.innerHTML == "")
    let posicion = Math.floor(Math.random() * vacias.length)

    let casillaElegida = vacias[posicion]

    return movida(casillaElegida, turno.innerHTML)
}