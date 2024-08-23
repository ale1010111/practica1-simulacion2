const cartasCorazones = ['A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥'];
const cartasDiamantes = ['A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦'];
const cartasTreboles = ['A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣'];
const cartasEspadas = ['A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠'];

document.getElementById('barajarBtn').addEventListener('click', barajar);
document.getElementById('limpiarBtn').addEventListener('click', limpiar);

function barajar() {
    const numBarajadas = parseInt(document.getElementById('numBarajadas').value);
    if (isNaN(numBarajadas) || numBarajadas <= 0) return;

    let contadorCartas = {};

    limpiar();  // Limpiar antes de barajar

    const startTime = performance.now();

    for (let i = 0; i < numBarajadas; i++) {
        let cartasSeleccionadas = [
            obtenerCartaAleatoria(cartasCorazones),
            obtenerCartaAleatoria(cartasTreboles),
            obtenerCartaAleatoria(cartasDiamantes),
            obtenerCartaAleatoria(cartasEspadas)
        ];

        cartasSeleccionadas.forEach(carta => {
            contadorCartas[carta] = (contadorCartas[carta] || 0) + 1;
        });

        if (i < 1000) {  // Solo mostrar las primeras 1000 iteraciones para evitar sobrecargar la interfaz
            mostrarCartas(cartasSeleccionadas);
        }
    }

    const endTime = performance.now();
    const elapsedTime = (endTime - startTime).toFixed(2);

    mostrarResultados(contadorCartas, numBarajadas, elapsedTime);
}

function obtenerCartaAleatoria(palo) {
    return palo[Math.floor(Math.random() * palo.length)];
}

function mostrarCartas(cartasSeleccionadas) {
    const resultadosDiv = document.getElementById('resultados');
    const cartasHtml = cartasSeleccionadas.map(carta => `<div class="column"><span class="card">${carta}</span></div>`).join('');
    resultadosDiv.innerHTML += `<div class="row">${cartasHtml}</div>`;
}

function mostrarResultados(contadorCartas, numBarajadas, elapsedTime) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML += `<h3>Resultados:</h3>`;
    for (let carta in contadorCartas) {
        const porcentaje = ((contadorCartas[carta] / (numBarajadas * 4)) * 100).toFixed(2);
        resultadosDiv.innerHTML += `<div>${carta}: ${contadorCartas[carta]} veces (${porcentaje}%)</div>`;
    }
    resultadosDiv.innerHTML += `<div><strong>Tiempo de respuesta:</strong> ${elapsedTime} ms</div>`;
}

function limpiar() {
    document.getElementById('resultados').innerHTML = '';
}
