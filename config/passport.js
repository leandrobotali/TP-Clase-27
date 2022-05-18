const passport = require('passport')
const Strategy = require ('passport-local').Strategy

const User = require('../models/users.js')

passport.use('singUp', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    if(password.length < 4){
        const mensaje = "Contraseña muy corta"
        req.app.io.sockets.emit("error", mensaje)
        return done(null, false)
    }else {
        const emailUser =await User.findOne({email:email}).lean()
        if(emailUser){
            const mensaje = "El email ya esta en uso"
            req.app.io.sockets.emit("error", mensaje)
            return done(null, false)
        } else {
            const newUser = new User({email,password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            return done(null, newUser)
        }
    }
}))


passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) {
        const mensaje = "Email incorrecto"
        req.app.io.sockets.emit("error", mensaje)
        return done(null, false,)
    } else {
        //validar la contraseña
        const match = await user.matchPassword(password)
        if (match) {
            console.log('loggeado');
            req.app.io.sockets.emit("bienvenido", user.email)
            return done(null, user);
        } else {
            const mensaje = "Contraseña incorrecta"
            req.app.io.sockets.emit("error", mensaje)
            return done(null, false)
        }
    }
}))


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})