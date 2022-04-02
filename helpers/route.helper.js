


const validPath = (...paths) => (value) => {
    if(!paths.includes(value))
        throw new Error('La ruta especificada no existe');
    return true;
}

module.exports = {
    validPath
}