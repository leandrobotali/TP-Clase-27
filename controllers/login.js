const login = (req,res) => {
    const { nombre } = req.body
    req.session.user = nombre
    const user = (req.session.user).toUpperCase()
    res.send(req.app.io.sockets.emit("bienvenido", user))
    // res.redirect('/')
}

const logout= (req,res) => {
    const user = (req.session.user).toUpperCase()
    req.session.destroy(err => {
        if(!err) res.send(req.app.io.sockets.emit("logout", user))
        else res.send({status: 'Logout ERROR', body: err})
    })
}


module.exports = { login,logout }