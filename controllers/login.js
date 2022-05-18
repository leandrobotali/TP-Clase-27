const passport = require('passport')
const Strategy = require ('passport-local').Strategy

const login = passport.authenticate('login')

const singUp = passport.authenticate('singUp')

const logout= (req,res) => {
    const user = req.user
    req.logout()
    res.send(req.app.io.sockets.emit("logout", user.email))
} 


module.exports = { logout, singUp, login}