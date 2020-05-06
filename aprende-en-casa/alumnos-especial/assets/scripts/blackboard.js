//$( document ).ready(function() {
  // set up text to print, each item in array is new line
  
  //$( "html" ).scrollTop( 0 );

  $('.bbInfo').click(function(){
    $('#bbMenu').fadeToggle(function(){
      $('#intro').fadeToggle();
    });
  });

  $('.showMenu').click(function(){
    Cookies.set('intro',true);
    $('.bbInfo').fadeIn();
    showMenu();
  });

  var aText = new Array(
    "Estimad@ estudiante:", 
    "Para proteger tu salud, la de tus maestr@s, amig@s y la de tu familia, la Secretaría de Eduación Publica a través de la Autoridad Educativa Federal en la Ciudad de México ha suspendido las clases presenciales. ¡Esto no siginifica que sean vacaciones, juntos vamos a estudiar desde casa!",
    "Para ello, hemos preparado algunos materiales educativos que te servirán como apoyo durante estos días. Junto con tu familia y maestr@s te invitamos a revisar la plataforma Aprende en Casa.",
    "¡DISFRÚTALOS!"
  );
  var iSpeed = 20; // time delay of print out 80
  var iIndex = 0; // start printing array at this posision
  var iArrLength = aText[0].length; // the length of the text array
  var iScrollAt = 20; // start scrolling up at this many lines
   
  var iTextPos = 0; // initialise text position
  var sContents = ''; // initialise contents variable
  var iRow; // initialise current row
   
  function typewriter()
  {
   sContents =  ' ';
   iRow = Math.max(0, iIndex-iScrollAt);
   var destination = document.getElementById("typedtext");
   
   while ( iRow < iIndex ) {
    //console.log(iIndex);
    sContents += aText[iRow++] + '<br /><br />';

    if(iIndex == aText.length - 1){
      //console.log(sContents);
    }
   }
   destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
   if ( iTextPos++ == iArrLength ) {

    iTextPos = 0;
    iIndex++;
    if ( iIndex != aText.length ) {

     iArrLength = aText[iIndex].length;
     setTimeout("typewriter()", 500);
    } else {
      setTimeout("showMenu()", 1000);
      Cookies.set('intro',true);
    }
   } else {

    setTimeout("typewriter()", iSpeed);
   }
  }

  function showMenu()
  {
    $('#intro').fadeOut(function(){
      $('#bbMenu').fadeIn();
    });
    
  }

  if(typeof Cookies.get('intro') === 'undefined')
  {
     $('#intro').show();
     $('.bbInfo').hide();
    //typewriter();
  }else {
    showMenu();
  }
//});