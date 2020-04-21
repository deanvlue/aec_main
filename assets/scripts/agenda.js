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
        if(i===0 && it ===0){
          btn.id="mainbutton";
        }else{
          let btnName = "B-"+i+"-"+it;
          btn.id=btnName;
        }
        //btn.innerHTML= "<b>"+materiaText+"</b><br/>"+tareaText;
        btn.innerHTML= "<b>"+tareaText+"</b>";
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target","#seleccionaTarea");
      // fin de botón
//      let cellText = document.createTextNode(tareaText);
      cell.appendChild(btn);
      cell.className="text-center"
      if(tareaText==="PAUSA ACTIVA"){
        btn.className="btn btn-warning btn-agenda";
        cell.className=cell.className + " warning";
        btn.disabled="disabled";
      }
      row.appendChild(cell);
    })
    tablaAgenda.appendChild(row);
  
});


  tareasDisponibles.forEach((tarea, index)=>{
    let btnTask = document.createElement('button');
    btnTask.className="btn btn-primary btn-tarea";
    btnTask.setAttribute('data-dismiss', 'modal')
    btnTask.innerText=tarea;
    if(index%2 !== 0){
      modalTareasDisponibles = document.getElementById("modal-tareas-disponibles");
    }else{
      modalTareasDisponibles = document.getElementById("modal-tareas-disponibles-p");
    }
    modalTareasDisponibles.appendChild(btnTask);
  })

function cambiaHorario(val){
  if(val===1){
    document.querySelector("#mainbutton").innerHTML="<b>NUEVA TAREA 1</b><br/>Prueba tarea";
  }else{
    document.querySelector("#mainbutton").innerHTML="<b>OTRA TAREA 2</b><br/>Prueba tarea DOS";
  }
}
