const  fs  =  require ( 'fs' ) ;
const  path  =  require ( 'path' ) ;

//leer la terminal
const  posRuta  =  process.argv[ 2 ]

//función resolver ruta
const resolverRuta = (ruta) => {
  if(path.isAbsolute(ruta)){
      return ruta
  } else {
     return path.resolve(ruta)
  }
}

//función recursiva
const acumularArchivosMds = (ruta) => {
  let arrayMds = []
  if(fs.statSync(ruta).isFile() && path.extname(ruta) === '.md'){
      arrayMds.push(ruta)
  } else if(fs.statSync(ruta).isFile() && path.extname(ruta) !== '.md') {
      console.log ('no es un archivo md')
  } else {
      const elementos = fs.readdirSync(ruta) //leee el contenido de la carpeta
      elementos.forEach((elem)=>{
          const nuevaRuta = path.join(ruta, elem)
          if(fs.statSync(nuevaRuta).isFile() && path.extname(ruta) === '.md'){
              arrayMds.push(nuevaRuta)
          }else {
              arrayMds = arrayMds.concat(acumularArchivosMds(nuevaRuta))
          }
      })
  }
  return arrayMds
}

console.log(acumularArchivosMds("C:/Users/Lau/Desktop/BOG005-md-links/Prueba"));

//buscar enlaces de un solo md

//buscar el resultado de links encontrados en la funcion anterior




//exportar modulos
module.exports = {resolverRuta, acumularArchivosMds}



    /*if(read !== null || read !== undefined){
      if(text.includes('https://www.')){
        links.push(text.replace("Finalizado!\r\n", "" ).replace("\r\n", "" ).split(","))
        console.log(links, "Si es un link");
    }
      else{
        console.log("No es un link");
      }
    }*/
    
    //Leer el archivo

//["https://www.youtube.com/"]