const materias = [
  "PENSAMIENTO MATEMÁTICO",
  "LENGUAJE Y COMUNICACIÓN",
  "CUIDADO DE LA SALUD",
  "CONVIVENCIA SANA Y CIVISMO",
];

const horarios = [
  "9:00 a 9:25",
  "9:25 a 9:35",
  "9:35 a 10:00", 	  	  	  	  	  	 
  "12:00 a 12:25", 	  	  	  	  	  	 
  "12:25 a 12:35",
  "12:35 a 13:00",
]

// variables de agendaActividad en ./actividades/actividades.js
// variables de  tareasDisponibles en ./actividades/actividades.js
 

if (typeof(Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
  //console.log("Si hay pa guardar");
  let agenda = localStorage.getItem('agendaActividad');
  if(agenda === null){
    localStorage.setItem('agendaActividad', JSON.stringify(agendaActividad));
  }else{
    agendaActividad = JSON.parse(agenda);
  }
} else {
  // Sorry! No Web Storage support..
}

function transformAgenda(a){
  let agendaHora = [];
  let agenda = [];

  let j =0;

  for(let i = 0; i<=3; i++){
    agendaHora=[];
    a.forEach(dia =>{
      agendaHora.push(dia[j]);
    });
    j++;
    agenda.push(agendaHora);
  }
  return agenda;
}


let tablaAgenda = document.querySelector("#tablaAgenda");

horarios.forEach((h,i) =>{
  let row = document.createElement('tr');
  // agrega el horario
  let horario = document.createElement('td');
  let horarioTexto = document.createTextNode(h);
  horario.appendChild(horarioTexto);
  row.appendChild(horario);

    let tareaText="" ;
    agendaActividad.forEach((tslot,it)=>{
      let cell = document.createElement('td')
        if(tslot[i].tarea === undefined || tslot[i].tarea===""){
        tareaText = '&nbsp';
        }else{
          tareaText = tslot[i].tarea;
        }
      // genera un botón con la información de la tarea:
        let btn = document.createElement('button');
        btn.className="btn btn-agenda btn-primary";
        let btnName = "B-"+i+"-"+it;
        btn.id=btnName;
        //btn.innerHTML= "<b>"+materiaText+"</b><br/>"+tareaText;
        btn.innerHTML= tareaText;
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target","#seleccionaTarea");
        btn.setAttribute("onclick","capturaEvento(this);");
      // fin de botón
//      let cellText = document.createTextNode(tareaText);
      cell.appendChild(btn);
      cell.className="text-center"
      if(tareaText==="PAUSA ACTIVA"){
        btn.className="btn btn-disabled ";
        btn.id="PA";
        cell.className=cell.className + " disabled";
        btn.disabled="disabled";
      }
      row.appendChild(cell);
    })
    tablaAgenda.appendChild(row);
});

let idButtonHorario = "";

let tareasButtons = document.querySelectorAll(".modal-body button");

tareasButtons.forEach((b,i)=>{
  if(tareasDisponibles[i] !== undefined || tareasDisponibles !== ""){
    b.innerHTML = tareasDisponibles[i];
    b.setAttribute("onclick","seleccionaTarea(this);")
  }else{
    b.classList = "hidden";
  }
});

function seleccionaTarea(e){
  if(idButtonHorario===""){
    return;
  }
  // cambia estatus del botón
  document.getElementById(idButtonHorario).innerHTML = e.innerHTML;
  // cambia estatus de agenda actividdad
  cambiaEstatusAgenda(idButtonHorario, e.innerHTML);
  //guarda estatus en el storage local
}

function cambiaEstatusAgenda(id, newValue){
  if(id!==""){
    const tareasLocation = id.split("-");
    //console.log(tareasLocation[1]);
    agendaActividad[tareasLocation[2]][tareasLocation[1]].tarea= newValue;
    localStorage.setItem('agendaActividad', JSON.stringify(agendaActividad));
  }
  return
}

function capturaEvento(e){
  idButtonHorario=e.id;
}

// temporal cambia título
function cambiaTitulo(){
  let t = document.getElementById("tituloAgenda");
  if(t.innerText ==="Te invitamos a que diseñes tu agenda de actividades en casa:"){
    t.innerText = "Ejemplo de Agenda de actividades en casa";
  }else{
    t.innerText = "Te invitamos a que diseñes tu agenda de actividades en casa:";
  }
}