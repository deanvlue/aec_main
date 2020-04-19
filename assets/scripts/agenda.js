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


const agendaActividad = [
  [
    {
      materia: materias[0],
      tarea: "Lunes Algebra"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[1],
      tarea: "Español Lunes"
    },
    {
      materia: materias[2],
      tarea: "Salud"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[3],
      tarea: "Civismo"
    },
  ],
  [
    {
      materia: materias[0],
      tarea: "Martes Algebra"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[1],
      tarea: "Español Martes"
    },
    {
      materia: materias[2],
      tarea: "Salud"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[3],
      tarea: "Civismo"
    }
  ],
  [
    {
      materia: materias[0],
      tarea: "Algebra"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[1],
      tarea: "Español Miércoles"
    },
    {
      materia: materias[2],
      tarea: "Salud"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[3],
      tarea: "Civismo"
    }
  ],
  [
    {
      materia: materias[0],
      tarea: "Algebra"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: "",
      tarea: ""
    },
    {
      materia: materias[2],
      tarea: "Salud"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[3],
      tarea: "Civismo"
    }
  ],
  [ 
    {
      materia: materias[0],
      tarea: "Algebra"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: materias[1],
      tarea: "Español"
    },
    {
      materia: materias[2],
      tarea: "Salud"
    },
    {
      materia: "PAUSA",
      tarea:"PAUSA ACTIVA"
    },
    {
      materia: "",
      tarea: ""
    }
  ]
];


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


tablaAgenda = document.querySelector("#tablaAgenda");

horarios.forEach((h,i) =>{
  let row = document.createElement('tr');
  // agrega el horario
  let horario = document.createElement('td');
  let horarioTexto = document.createTextNode(h);
  horario.appendChild(horarioTexto);
  row.appendChild(horario);

    let tareaText="" ;
    let materiaText="";
    agendaActividad.forEach((tslot,it)=>{
      let cell = document.createElement('td')
        if(tslot[i].tarea === undefined){
        tareaText = " Matemáticas";
        }else{
          tareaText = tslot[i].tarea;
          materiaText= tslot[i].materia;
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
        btn.innerHTML= "<b>"+materiaText+"</b><br/>"+tareaText;
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target","#seleccionaTarea");
      // fin de botón
//      let cellText = document.createTextNode(tareaText);
      cell.appendChild(btn);
      cell.className="text-center"
      if(tareaText==="PAUSA ACTIVA"){
        btn.className="btn btn-agenda btn-warning";
        cell.className=cell.className + " warning";
      }
      row.appendChild(cell);
    })
    tablaAgenda.appendChild(row);
  
});


function cambiaHorario(val){
  if(val===1){
    document.querySelector("#mainbutton").innerHTML="<b>NUEVA TAREA 1</b><br/>Prueba tarea";
  }else{
    document.querySelector("#mainbutton").innerHTML="<b>OTRA TAREA 2</b><br/>Prueba tarea DOS";
  }
}