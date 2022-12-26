const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//leer la terminal


//función resolver ruta
const resolverRuta = (ruta) => {
  if (path.isAbsolute(ruta)) {
    return ruta;
  } else {
    return path.resolve(ruta);
  }
};
//console.log(resolverRuta(ruta), 18);
//función recursiva
const acumularArchivosMds = (ruta) => {
  let arrayMds = [];
  if (fs.statSync(ruta).isFile() && path.extname(ruta) === ".md") {
    arrayMds.push(ruta);
  } else if (fs.statSync(ruta).isFile() && path.extname(ruta) !== ".md") {
    console.log("no es un archivo md");
  } else {
    const elementos = fs.readdirSync(ruta); //leee el contenido de la carpeta
    elementos.forEach((elem) => {
      const nuevaRuta = path.join(ruta, elem);
      if (fs.statSync(nuevaRuta).isFile() && path.extname(ruta) === ".md") {
        arrayMds.push(nuevaRuta);
      } else {
        arrayMds = arrayMds.concat(acumularArchivosMds(nuevaRuta));
      }
    });
  }
  return arrayMds;
};

console.log("prueba1", acumularArchivosMds("C:/Users/Lau/Desktop/BOG005-md-links/Prueba"));

//Leer archivo MD

const leerMd = (ruta) => {
  return new Promise((resolve, reject) => {
    read = fs.readFile(ruta, "utf-8", (err, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const extraerLinks = (content, ruta) => {
  // donde envias ruta??????
 
  const obj = [];
  let render = new marked.Renderer();
  render.link = (href, title, text) => {
    //console.log(href, 60);
    obj.push({
      href: href,
      text: text,
      route: ruta,    
    });
    console.log(ruta);
  };
  marked(content, { renderer: render });
  //console.log(obj, 69);
  return obj;
};

const validarLinks = (array) =>{
  array.forEach((element)=>{
    

  })
}

//Esto va en el index
leerMd("C:/Users/Lau/Desktop/BOG005-md-links/Prueba/carpeta1/prueba2.md")
  .then((content) => {
   let arrayObjetos = extraerLinks(content, resolverRuta("C:/Users/Lau/Desktop/BOG005-md-links/Prueba/carpeta1/prueba2.md"));
   //console.table(arrayObjetos);
   validarLinks(arrayObjetos);
  })
  .catch(() => {});

//marked.renderer

//axios.get

//validar con fetch
//buscar enlaces de un solo md

//exportar modulos
module.exports = { resolverRuta, acumularArchivosMds };
