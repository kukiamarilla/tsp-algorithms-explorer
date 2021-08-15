
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