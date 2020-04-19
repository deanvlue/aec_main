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
      materia: materias[1],
      tarea: "Español Lunes"
    },
    {
      materia: materias[2],
      tarea: "Salud"
    },
    {
      materia: materias[3],
      tarea: "Civismo"
    },
    {
      materia: materias[0],
      tarea: "Recreación Matemática Lunes"
    }
  ],
  [
    {
      materia: materias[0],
      tarea: "Martes Algebra"
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
      materia: materias[1],
      tarea: "Español Miércoles"
    },
    {
      materia: materias[2],
      tarea: "Salud"
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
      materia: materias[1],
      tarea: "Español Jueves"
    },
    {
      materia: materias[2],
      tarea: "Salud"
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
      materia: materias[1],
      tarea: "Español"
    },
    {
      materia: materias[2],
      tarea: "Salud"
    },
    {
      materia: materias[3],
      tarea: "Civismo"
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

const agendaFecha = transformAgenda(agendaActividad);


tablaAgenda = document.querySelector("#tablaAgenda");

horarios.forEach((h,i) =>{
  let row = document.createElement('tr');
  // agrega el horario
  let horario = document.createElement('td');
  let horarioTexto = document.createTextNode(h);
  horario.appendChild(horarioTexto);
  row.appendChild(horario);

    let tareaText="" ;

      if(i===1 || i===4){
        let pausa = document.createElement('td')
        pausa.colSpan="6";
        pausa.className="text-center warning";
        pausa.innerText="PAUSA ACTIVA";
        row.appendChild(pausa);
        tablaAgenda.appendChild(row);
      }
    agendaActividad.forEach(tslot=>{
      let cell = document.createElement('td')
        if(tslot[i].tarea === undefined){
        tareaText = " Matemáticas";
        }else{
          tareaText = tslot[i].tarea;
        }
      let cellText = document.createTextNode(tareaText);
      cell.appendChild(cellText);
      row.appendChild(cell);
    })
    tablaAgenda.appendChild(row);
  
});
