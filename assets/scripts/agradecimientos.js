const urlPath = '/assets/images/btn/agradecimiento/brands/';

const brands = [
  'gobierno.png',
  'fundacion.png',
  'google.png',
  'microsoft.png',
  'facebook.png',
  'unicef.png',
  'televisa.png',
  'Movistar.png',
  'ine.png',
  'radio.png',
  'mide.png',
  'papalote.png',
  'plazasesamo.png',
  'blank.png',
  'stc.png',

  'science_bits.png',
  'chango_maniaco.png',
  'anthal.png',
  'muzzy.png',
  'inbal.png',
  'socrates.png',

  'uam.png',
  'fundacion_aprende.png',
];


let agradecimientos = document.getElementById("agradecimientos");

let carousel = document.createElement("div");
carousel.setAttribute("id", "carousel-agradecimientos");
carousel.setAttribute("data-ride", "carousel");
carousel.classList.add("carousel");
carousel.classList.add("slide");
// let indicators = document.createElement("ol");
// indicators.classList.add("carousel-indicators");
let inner = document.createElement("div");
inner.classList.add("carousel-inner");
inner.setAttribute("role", "listbox");


// Muestra las imagenes 1 x 1
/*brands.forEach((b,index) => {
  //let linkItem = document.createElement('li');

  //linkItem.setAttribute("data-target", "#carousel-agradecimientos");
  //linkItem.setAttribute('data-slide-to', index);
  //indicators.appendChild(linkItem);


  imgItem.src = urlPath + b;
  imgItem.alt = b;

  a.push(b)
  if (a.length === 3) {
    console.log(a);
    a=[]
  }




});*/

// muestra las imágenes por chunks
let chunk = 3;
let tempA = [];
for (let i = 0, j = brands.length; i < j; i += chunk) {
  tempA = brands.slice(i, i + chunk);
  let item = document.createElement('div');
  item.classList.add('item');
  item.classList.add('text-center');
  if (i === 0) {
    item.classList.add('active');
  }

  tempA.forEach((b) => {
    let imgItem = document.createElement('img');
    imgItem.src = urlPath + b;
    imgItem.alt = b;
    imgItem.classList.add('img-fluid');
    imgItem.classList.add('agradecimientos');
    item.appendChild(imgItem);
  });

  inner.appendChild(item);

  // console.log(tempA);
}


let prev = document.createElement("a");
prev.classList.add('left');
prev.classList.add('carousel-control');
prev.href = "#carousel-agradecimientos";
prev.setAttribute("role", "button");
prev.setAttribute("data-slide", "prev");
let iconPrev = document.createElement("span");
iconPrev.classList.add('glyphicon');
iconPrev.classList.add('glyphicon-chevron-left');
iconPrev.setAttribute("aria-hidden", "true");
let textPrev = document.createElement("span");
textPrev.classList.add('sr-only');
textPrev.innerText = "Previous";
prev.appendChild(iconPrev);
prev.appendChild(textPrev);

let next = document.createElement("a");
next.classList.add('right');
next.classList.add('carousel-control');
next.href = "#carousel-agradecimientos";
next.setAttribute("role", "button");
next.setAttribute("data-slide", "next");
let iconNext = document.createElement("span");
iconNext.classList.add('glyphicon');
iconNext.classList.add('glyphicon-chevron-right');
iconNext.setAttribute("aria-hidden", "true");
let textNext = document.createElement("span");
textNext.classList.add('sr-only');
textNext.innerText = "Next";
next.appendChild(iconNext);
next.appendChild(textNext);


// carousel.appendChild(indicators)
carousel.appendChild(inner);
carousel.appendChild(prev);
carousel.appendChild(next);

agradecimientos.appendChild(carousel);