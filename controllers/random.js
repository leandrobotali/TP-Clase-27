const { fork } = require('child_process')

const getRandom= (req,res) => {
    const cant = req.query.cant || 100000000
    const procRandom = fork('./procesoRandom.js')
    procRandom.on('message', resultado => {
        res.json({resultado})
    })
    procRandom.send(cant)
} 


module.exports = { getRandom }