
export const crearMatriz = (n) => {
    return Array(n).fill().map( () => Array(2).fill(0))
}

export const clonarMatriz = (matriz) => {
    return JSON.parse(JSON.stringify(matriz))
}

export const hallarTranspuesta = (matriz) => {
    return matriz[0].map((_, colIndex) => matriz.map(row => row[colIndex]))
}