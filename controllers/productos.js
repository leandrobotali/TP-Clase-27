const { faker } = require('@faker-js/faker')

const generarProductos = () =>{
    console.log('desde productos');
    const productos = []
    
    for (let index = 0; index < 5; index++) {
        const obj = {
            titulo: faker.name.findName(),
            precio: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        }
        productos.push(obj)
    }

    return productos
}

module.exports = { generarProductos }