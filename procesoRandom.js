function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function procRandom(cant) {
    let arrayRandoms = []

    for (let i = 1; i <= cant; i++) {
        let numRandom = random(1,1000);
        arrayRandoms.push(numRandom)       
    }

    return arrayRandoms
}

process.on('message', cant => {
    let arrayRandoms = procRandom(cant)

    let arrayObj = []

    for (let i = 1; i <= 1000; i++) {
        let nuevoArray = arrayRandoms.filter(elem => elem == i)
        cantidad = nuevoArray.length
        let elem = {
            num: i,
            cantidad: cantidad
        }
        arrayObj.push(elem)
    }
    
    // let arrayObj = []

    // for (let i = 1; i <= 1000; i++) {
    //     let cantidad = 0
    //     for (let j = 0; j < arrayRandoms.length; j++) {
    //         if (i = arrayRandoms[j]){
    //             cantidad ++
    //         }            
    //     }
    //     let elem = {
    //         num: i,
    //         cantidad: cantidad
    //     }
    //     arrayObj.push(elem)
    // }

    process.send(arrayObj)

    process.exit()
})