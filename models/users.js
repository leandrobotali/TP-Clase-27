const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchemma = new Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    }
},{
    timestamps:true
});

userSchemma.methods.encryptPassword = async password =>{
    const Salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,Salt)
}

userSchemma.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password );
}


module.exports = model('user', userSchemma)