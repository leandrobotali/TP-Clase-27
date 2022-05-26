const mongoose = require('mongoose');

const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST, MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI)
.then(db => console.log('database is connected'))
.catch(err => {
    console.error('connection error')
    process.exit(1)
});