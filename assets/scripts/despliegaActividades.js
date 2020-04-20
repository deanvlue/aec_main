const nivelActual = location.search;
let req;

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

function openLink()

//document.querySelector("#nivel").textContent = r.nivel + " y la actividad es: " + r.actividad;
document.querySelector("#link-nivel").href="../niveles/"+r.nivel+"/index.html";
document.getElementById("img-link").src="/assets/images/btn/niveles/icono_"+r.nivel+"@2x.svg";

window.addEventListener('load',()=>{
  const nivelActual = location.search;
  req = getQueryParams(nivelActual);
  //console.log(r);
  const currentLevel = niveles[req.nivel];

  const navbar = document.getElementById("navigation-pills");

  currentLevel.forEach(l=>{
    let btnNav = document.createElement('li')
    let linkNav = document.createElement('a');
    btnNav.role="presentation";
    linkNav.href="#";
    linkNav.innerText = firstUpper(l);
    btnNav.appendChild(linkNav)
    navbar.appendChild(btnNav);
  })

//  document.getElementById("contenido").innerHTML='<object type="text/html" data="links/link001.html" ></object>';
  //aprende-en-casa-2\actividades\links\link001.html

    fetch("links/link001.html" /*, options */)
    .then((response) => response.text())
    .then((html) => {
        document.getElementById("contenido").innerHTML = html;
    })
    .catch((error) => {
        console.warn(error);
    });
});