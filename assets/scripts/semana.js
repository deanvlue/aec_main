const ahora = new Date();

const inicio = startOfWeek(ahora);
const final = addDays(inicio, 4);

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio", 
  "Augosto", 
  "Septiembre", 
  "Octubre",
  "Noviembre",
  "Diciembre"
];

// construye la cadena
const nombreSemana = "Semana del " + inicio.getDate().toString() + " de " + monthNames[inicio.getMonth()] + " al " + final.getDate() + " de " + monthNames[final.getMonth()];

document.querySelector("#semana").textContent = nombreSemana;

function startOfWeek(date){
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function addDays(date, days) {
  
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
// regresa el viernes de esa fecha
