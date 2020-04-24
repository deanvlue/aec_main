const nivelActual = location.search;
let req;
let grado = "primero";

const niveles={
  "inicial":[ "lactantes", "maternales"],
  "preescolar":["primero", "segundo","tercero"],
  "primaria":["primero", "segundo", "tercero", "cuarto", "quinto", "sexto"],
  "secundaria":["primero", "segundo","tercero"],
  "eespecial":["preescolar", "primaria baja", "primaria alta", "especial secundaria", "especial laboral"],
  "eadultos":["primaria", "secundaria incial", "secundaria avanzada"]
};


function getQueryParams(URL){
  let request = { };

  let _URL = URL.replace("?","");
    _URL = _URL.split("&");
    if(_URL.length > 1){
      _URL.forEach(element => {
        request[element.split("=")[0]] = element.split("=")[1];
      });
    }
    return request;
}

function firstUpper(cadena){
    if(cadena ==='eespecial'){
      return 'Especial';
    }
    
    if(cadena === 'eadultos'){
      return 'para Adultos';
    }

  return cadena
  .replace(/^[a-z]{1}/g, function($1) { return $1.toUpperCase(); })
}

const r = getQueryParams(nivelActual);


//document.querySelector("#nivel").textContent = r.nivel + " y la actividad es: " + r.actividad;
document.querySelector("#link-nivel").href="../niveles/"+r.nivel+"/index.html";
document.getElementById("img-link").src="/assets/images/btn/niveles/icono_"+r.nivel+"@2x.svg";

window.addEventListener('load',()=>{
  const nivelActual = location.search;
  req = getQueryParams(nivelActual);
  //console.log(req);
  generaBotonesGrados(req);

  cargaActividades(link);


//  document.getElementById("contenido").innerHTML='<object type="text/html" data="links/link001.html" ></object>';
  //aprende-en-casa-2\actividades\links\link001.html

    /*fetch("links/mason.html")
    .then((response) => response.text())
    .then((html) => {
        document.getElementById("contenido").innerHTML = html
    })
    .catch((error) => {
        console.warn(error);
    });*/
    //console.log(links);
    
    // deprecated
    //cambiaContenido(links, req.nivel, grado ,'fichas');
});
//  genera los botoones pills de grados
function generaBotonesGrados(req){

  // determina el nivel actual para deplegar los grados, ej. primaria: primero a sexto
  const currentLevel = niveles[req.nivel];

  const navbar = document.getElementById("navigation-pills");

  currentLevel.forEach(l=>{
    let btnNav = document.createElement('li')
    let linkNav = document.createElement('a');
    btnNav.role="presentation";
    linkNav.href="#";
    linkNav.id = l;
    linkNav.innerText = firstUpper(l);
    btnNav.appendChild(linkNav)
    navbar.appendChild(btnNav);
  });
}

// lee los links y carga todos los botones



// esta funcion cambia el estado actual de la actividad seleccionada
function setState(e, estado){
  //document.getElementById(e.id).className = document.getElementById(e.id).className + " active";
  cambiaContenido(links, req.nivel, grado ,e.id);
}

function cambiaContenido(linkDoc, nivel, grado , actividad){
    let contenido = document.getElementById("contenido");
    contenido.innerHTML="";
    let links = {};
    _links = linkDoc[nivel][grado][actividad];

    _links.forEach(l=>{
      let card = createCard(l, actividad);
      contenido.appendChild(card);
    })
    //contenido.innerHTML = '<p>' + JSON.stringify(links[nivel][actividad]) + '</p>';
}

function createCard(link, actividad){

  let gridItem = document.createElement('div');
    gridItem.className="grid-item";
  let panel = document.createElement('div');
    panel.className="thumbnail";
  let image = document.createElement('img');
      image.src='/assets/images/btn/actividades/min/icono-'+actividad+'.svg';
      image.className="img-responsive"
  let caption = document.createElement('div');  
      caption.className="caption";
  let anchor = document.createElement('a');
        anchor.className="btn btn-primary"
        anchor.role="button"
        anchor.href=link.link
        anchor.innerText="Leer";

  let header = document.createElement('h3');
    header.innerText = link.name;
  let p = document.createElement('p');
    p.appendChild(anchor);

    // se constuye el caption
    caption.appendChild(header);
    caption.appendChild(p);
    
    // se construye el panel
    panel.appendChild(image);
    panel.appendChild(caption);

    gridItem.appendChild(panel);
  return gridItem;
}  