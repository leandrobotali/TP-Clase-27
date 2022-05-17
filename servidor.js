const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }


const productosRouter = require ('./routes/productos.routes.js')
const loginRouter = require('./routes/login.routes.js')
const {getAllMessage,createMessage,nomalizarData} = require('./controllers/mensajes')

// const util = require('util')
// function print(objeto) {
//     console.log(util.inspect(objeto,false,12,true))
// }

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//-------------------------------------
//-------------------------------------
//session
app.use(session({
    store: MongoStore.create({ 
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://coderhouse:coderhouse@cluster0-shard-00-00.1xnky.mongodb.net:27017,cluster0-shard-00-01.1xnky.mongodb.net:27017,cluster0-shard-00-02.1xnky.mongodb.net:27017/sesiones?ssl=true&replicaSet=atlas-11uryb-shard-0&authSource=admin&retryWrites=true&w=majority',        
        mongoOptions: advancedOptions
    }),
    /* ----------------------------------------------------- */

    secret: 'prueba',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))



//-------------------------------------
//-------------------------------------
//Routes

app.use('/api/productos-test', productosRouter);
app.use('/login', loginRouter);
app.use('/', (req,res) => {
    if (req.session.user) {
        res.send(io.sockets.emit("bienvenido", req.session.user))
    }
})

//----------------------------------------
//----------------------------------------
//socket.io

io.on("connection", async (socket) => {
    console.log("Se ha conectado un cliente");
    socket.on("new_message", async data => {
        await createMessage(data);
        // getAllMessage().then(async (data) => io.sockets.emit("messages_received", {mensaje:"aca van los mensajes"})) 
        getAllMessage().then(async (data) => io.sockets.emit("messages_received", await nomalizarData(data))) 
    })   
    getAllMessage().then(async (data) => io.sockets.emit("messages_received", await nomalizarData(data))) 
    // getAllMessage().then((data) => print(nomalizarData(data)))
})

app.io = io;

//--------------------------------------
//--------------------------------------

app.use((req, res) => {
    res.json({
    error: {
        error: -2,
        descripcion: `Ruta ${req.originalUrl} y metodo ${req.method} no implementados`
}})});


//-------------------------------------
//-------------------------------------

const server = httpServer.listen(8080,() => {
    console.log(`puerto ${server.address().port}`);
})