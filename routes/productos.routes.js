const express = require('express');
const router = express.Router();

const { generarProductos } = require ('../controllers/productos.js')


router.get('/', (req,res) => {
    console.log('desde ruta')
    const productos = generarProductos()
    res.status(200).send(req.app.io.sockets.emit("actualizarProductos", productos))
} );

module.exports = router 