const nivelActual = location.search;
let req;
let grado = "primero";
let actividadActual = "";

const niveles={
  "inicial":[ "lactantes", "maternales"],
  "preescolar":["primero", "segundo","tercero"],
  "primaria":["primero", "segundo", "tercero", "cuarto", "quinto", "sexto"],
  "secundaria":["primero", "segundo","tercero"],
  "eespecial":["preescolar", "primaria baja", "primaria alta", "especial secundaria", "especial laboral"],
  "eadultos":["primaria", "secundaria incial", "secundaria avanzada"]
};

let actividadSeleccionada = {};
/*****
 * 
Televisión - General
Fichas - Filtro Grado:  1°, 2°, 3°, 4°, 5° y 6°
Libros de Texto  - Link externo
Lecturas - Filtro 1°, 2°, 3°, 4°, 5° y 6°
Videos - Filtro Asignaturas: Matemáticas, Español, Ciencias, Salud ** aquí pueden entrar más
Videojuegos - General 
Reforzamiento - General
Programación - Filtro Grado (En este momento solo tenemos 1°, pero "podríamos recibir más")
Activación física - Link externo
Retos - General
Actividades Lúdicas - General
Cineclub Familiar - General
 */

function getQueryParams(URL){
  let request = { };

  let _URL = URL.replace("?","");
    _URL = _URL.split("&");
    if(_URL.length >= 1){
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


/******* ON LOAD ****** */
window.addEventListener('load',()=>{
  const nivelActual = location.search;
  req = getQueryParams(nivelActual);
  //console.log(req);
  //generaBotonesGrados(req);
  generaBtnActividades(req, links);
  //cargaActividades(links);
  //filterActivities(null,"repaso");

});



function generaBtnActividades(req, links){
  const _req = req;
  const _links = links

  let menu = document.getElementById("menu-botones-actividad");
  //console.log(_req);
  //console.log(_links);
  let activities = Object.keys(_links);
  //console.log(activities)
  activities.forEach(a=>{
    menu.appendChild(createButton(a));
  })
  

}

// lee los links y carga todos los botones
function cargaActividades(links){
  let contenedor = document.getElementById("contenido");
  const _links = links;

  const niveles = Object.keys(_links)
  
  niveles.forEach(nivel=>{
    const grados = Object.keys(_links[nivel]);
    //console.log(`${nivel}-${grados}`);
    grados.forEach(grado=>{
      const actividades = Object.keys(_links[nivel][grado]);
      //console.log(`${nivel}-${grado}-${actividades}`);
      actividades.forEach(actividad=>{
        const links = Object.values(_links[nivel][grado][actividad])
        links.forEach(l=>{
          //console.log(`${nivel}-${grado}-${actividad}---${l.link}`);
          contenedor.appendChild(createCard(l,actividad, grado));
        });
      });
    });
  });
}

// genera las tarjetas para cada link.
function createCard(link, actividad, grado){
  let gridItem = document.createElement('div');
    gridItem.className="grid-item"
    gridItem.classList.add(actividad);
    gridItem.classList.add(grado);
  let panel = document.createElement('div');
    panel.className="thumbnail";
  let image = document.createElement('img');
      image.src='/assets/images/btn/actividades/min/icono-'+actividad+'.svg';
      image.className="img-responsive"
  let caption = document.createElement('div');  
      caption.className="caption";
  
  //cabecero y boton de link
  let header = document.createElement('h5');
    header.innerHTML = `${link.name}`;
  let anchor = document.createElement('a');
        anchor.className="btn btn-primary"
        anchor.role="button"
        anchor.href=link.link
        anchor.innerText="Leer";

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


// filterActivities filtra las actividades por el boton selecionado
function filterActivities(e, cName){
    let gradoButtons = document.getElementsByClassName("grado");
    let activityButtons = document.getElementsByClassName("btn-actividad");
  let items = document.getElementsByClassName("grid-item");

  if(e===null){
    activityButtons[0].click();
  }
  //if(cName === "all") cName = "";
  if(e.classList.contains("grado")){
    for(let i = 0; i < gradoButtons.length; i++){
      gradoButtons[i].classList.remove('active')
    }
    e.classList.add('active');
  }else{

    for(let i = 0; i < activityButtons.length; i++){
      activityButtons[i].classList.remove('active')
    }
    e.classList.add('active');
  }
  // tiene que validar si hay algún botón activo del otro bando
  // si da click en grado, busca en actividad
  // y viceversa
  // y con esto valida los dos estados
  for(let i=0; i < items.length; i++){
    items[i].classList.remove('show');
    if(items[i].classList.contains(cName)){
      items[i].classList.toggle('show');
    }
  }
}

function desactivaBotonesActividad(){
  let activityBtns = document.getElementsByClassName("btn-actividad");
  for( let i=0; i < activityBtns.length ; i++){
    activityBtns[i].classList.remove('active');
  }
}

function filtraActividad(e){
  cleanNavPills();

  let contenido = document.getElementById("contenido");
  desactivaBotonesActividad();
  e.classList.add('active');
  let activity = e.id;
  // Se le pasa la actividad y el nivel
  //console.log(contenido.childNodes);
  // Limpia Contenido
  despliegaContenido(contenido, activity, req.nivel);
  actividadActual = activity;
}

function despliegaContenido(c, act, level){
  cleanSlate(c);
  let iframe = document.createElement('iframe');
  actividadSeleccionada = links[act];
  //myObj.hasOwnProperty('key') 
  if(actividadSeleccionada.hasOwnProperty(level)){
    actividadSeleccionada = actividadSeleccionada[level]
    //c.innerText = JSON.stringify(actividadSeleccionada);
    //actividadSeleccionada={};
  }else{
    iframe.src = actividadSeleccionada.link;
    c.appendChild(iframe);
  }

  generaBotonesOpciones(actividadSeleccionada);

} 

//  genera los botoones pills de grados
function generaBotonesOpciones(opciones){
  // determina el nivel actual para deplegar los grados, ej. primaria: primero a sexto
  //const currentLevel = niveles[req.nivel];
  let _op = Object.keys(opciones);
  let btnTodos = document.getElementById("opcion-todos");
  const navbarPills = document.getElementById("navigation-pills");

  if(_op.length > 2){

    //btnTodos.classList.toggle("hidden");
    // aquí el botón de todos debe de ir escondido
    if(!btnTodos.classList.contains("hidden")){
      btnTodos.classList.add("hidden");
    }

    _op.forEach(l=>{

      /* si el elemento ya existe, solamente le quita la clase de hidden 
      * si no existe lo crea
      */
     let pillBtn = document.getElementById(l);
     if(!pillBtn){

      let btnNav = document.createElement('li')
      let linkNav = document.createElement('a');
      btnNav.role="presentation";
      btnNav.id=l
      linkNav.href="#";
      linkNav.classList.add("grado");
      linkNav.setAttribute('onclick',`filtraOpciones(this, '${l}')`);

      linkNav.addEventListener("click",(e)=>{
        e.preventDefault();
      })

      linkNav.innerText = firstUpper(l);
      btnNav.appendChild(linkNav)
      navbarPills.appendChild(btnNav);
     }else{
        pillBtn.classList.remove('hidden');
     }

    });
  }else{
    if(btnTodos.classList.contains("hidden")){
      btnTodos.classList.remove("hidden");
    }
      for (n of navbarPills.children){
        if(n.id !=="opcion-todos"){
          n.classList.add("hidden");
        }
      }
  }
}

function cleanSlate(c){
  // clean contenido
  while (c.hasChildNodes()) {  
    c.removeChild(c.firstChild);
  }
}

function createButton(activity){

  const actTitle ={
    tv:"Television",
    fichas:"Fichas de Repaso",
    libros: "Libros",
    lecturas: "Lecturas",
    videos: "Videos",
    videojuegos:"Videojuegos",
    programacion: "Programación",
    activacion: "Activación física",
    retos: "Retos",
    ludicas: "A. Lúdicas",
    cineclub: "Cine Club Familiar",
    reforzamiento:"Reforzamiento"
  }

  let row = document.createElement('div');
    row.classList.add('row');
  let col = document.createElement('div');
    col.classList.add('col-sm-12');
    col.classList.add('col-md-12');
  let btn = document.createElement('button')
    btn.id= activity;
    btn.classList.add('btn');
    btn.classList.add('btn-actividad');
    btn.setAttribute('onclick','filtraActividad(this)')
  let img = document.createElement('img');
    img.classList.add('img-responsive');
    img.classList.add('img-actividad-icon')
    img.src=`/assets/images/btn/actividades/min/icono-${activity}.svg`;
  let titulo = document.createElement('div')
    titulo.classList.add('btn-actividad-titulo');
    titulo.innerText = actTitle[activity];

    btn.appendChild(img);
    btn.appendChild(titulo);
    col.appendChild(btn);
    row.appendChild(col);
    return row;
}

function filtraOpciones(btn, op){
  // asegurar que ltodos los botones no estén activados
  //console.log(op);
  cleanNavPills()
  //for(n of navPills.children){
  btn.parentNode.classList.add('active');
  // dibuja sobre contenido las tarjetas con la actividad seleccionada
  let contenido = document.getElementById("contenido")
  let actividades = actividadSeleccionada[op];
  contenido.innerText="";

  actividades.forEach(a=>{
    let card = createCard(a,actividadActual,op);
    contenido.appendChild(card);
  })
  //contenido.innerText = JSON.stringify(actividadSeleccionada[op])
  //console.log(actividadSeleccionada[op])
}

function cleanNavPills(){
  let navPills = document.getElementById("navigation-pills").children;
  for(let i =0; i < navPills.length; i++){
    navPills[i].classList.remove('active');
  }
}