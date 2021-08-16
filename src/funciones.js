
export const crearMatriz = (n) => {
    return Array(n).fill().map( () => Array(2).fill(0))
}

export const clonarMatriz = (matriz) => {
    return JSON.parse(JSON.stringify(matriz))
}

export const hallarTranspuesta = (matriz) => {
    return matriz[0].map((_, colIndex) => matriz.map(row => row[colIndex]))
}

export const enteroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const aleatorizarMatriz = (min, max) => matriz => {
    const copia = clonarMatriz(matriz)
    for (let i=0; i < matriz.length; i++) {
        copia[i][0] = enteroAleatorio(min, max);
        copia[i][1] = enteroAleatorio(min, max);
    }
    return copia;
}

export const calcularCosto = (matriz, ruta) => {
    let costo = 0;
    for (let i=0; i < ruta.length - 1; i++) {
        const A = matriz[i];
        const B = matriz[i+1];
        const dist = (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2;
        costo = costo + Math.sqrt(dist);
    }
    // Agregar la vuelta
    const A = matriz[0];
    const B = matriz[ruta.length - 1];
    const dist = (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2;
    costo = costo + Math.sqrt(dist);

    return costo;
}

export const rutaString = (acc, valor) => `${acc} -> ${valor}`