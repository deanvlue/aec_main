const nivelActual = location.search;


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


const r = getQueryParams(nivelActual);

document.querySelector("#nivel").textContent = r.nivel + " y la actividad es: " + r.actividad;
document.querySelector("#link-nivel").href="../niveles/"+r.nivel+"/index.html";
document.querySelector("#img-link").src="/assets/images/btn/niveles/icono_"+r.nivel+"@2x.svg";
