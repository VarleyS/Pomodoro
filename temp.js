let timer;
let startT = Date.now();
let contador = 0;
let contadorMaxi = 0;

const inicializaSegundos = _segundos => {
    startT = Date.now();
    contador = 0;
    contadorMaxi = 0;
};

const calculaGapSecundos = () => {
    const segParaInicio = Math.floor((Date.now() - startT) / 1000);
    const segParafinal = segParaInicio - contador;
    contador += segParafinal;
    const overSec = contador > contadorMaxi ? contador - contadorMaxi : 0;

    return segParafinal - overSec;
}

self.addEventListener('message', e => {
    const resultado = e.data;

    if(resultado.startsWith('start-timer')) {
        inicializaSegundos(parseInt(resultado.split('_')[1], 10));
        timer = setInterval(() => {
            const gapSegun = calculaGapSecundos();
            for (let i = 0; i < gapSegun; i++){
                postMessage('tick');
            }
        }, 1000);
    }
    if(resultado.startsWith('change-timer')) {
        inicializaSegundos(parseInt(resultado.split('_')[1], 10));
    }
    if(resultado === 'stop-timer'){
        clearInterval(timer);
    }
})