const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.1xnky.mongodb.net/usuarios?retryWrites=true&w=majority')
.then(db => console.log('database is connected'))
.catch(err => {
    console.error('connection error')
    process.exit(1)
});