const folderName = location.pathname;

document.querySelectorAll("#nivel").forEach(obj=>{
  obj.textContent = firstUpper(folderName.split("/").reverse()[1]);
})

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