

const getInfo= (req,res) => {
    const info = {
        "Path de ejecucion": process.execPath,
        "Carpeta del proyecto": process.argv[1],
        "Argumentos de ejecucion": process.execArgv,
        "Plataforma": process.platform,
        "Version de Node": process.version,
        "Id del proceso": process.pid,
        "Memoria total Reservada": process.memoryUsage().rss
    }
    res.status(200).json(info)
} 


module.exports = { getInfo }