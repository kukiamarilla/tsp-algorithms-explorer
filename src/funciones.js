
export const crearMatriz = (n) => {
    return Array(n).fill().map( () => Array(n).fill(0))
}

export const clonarMatriz = (matriz) => {
    return JSON.parse(JSON.stringify(matriz))
}
