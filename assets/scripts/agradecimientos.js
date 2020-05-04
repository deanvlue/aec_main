const urlPath= '/assets/images/btn/agradecimiento/brands/';

const brands= [
  'facebook.png',
  'fundacion.png',
  'fundacion_aprende.png',
  'gobierno.png',
  'google.png',
  'ine.png',
  'microsoft.png',
  'Movistar.png',
  'televisa.png',
  'uam.png',
];


let agradecimientos = document.getElementById("agradecimientos");

let carousel = document.createElement("div");
carousel.setAttribute("id", "carousel-agradecimientos");
carousel.setAttribute("data-ride", "carousel");
carousel.classList.add("carousel");
carousel.classList.add("slide");
//let indicators = document.createElement("ol");
//indicators.classList.add("carousel-indicators");
let inner = document.createElement("div");
inner.classList.add("carousel-inner");
inner.setAttribute("role", "listbox");

brands.forEach((b,index) => {
  //let linkItem = document.createElement('li');
  let item = document.createElement('div');
  let imgItem = document.createElement('img');

  //linkItem.setAttribute("data-target", "#carousel-agradecimientos");
  //linkItem.setAttribute('data-slide-to', index);
  //indicators.appendChild(linkItem);

  if (index === 0) {
    item.classList.add('active');
  }

  item.classList.add('item');
  imgItem.src = urlPath + b;
  imgItem.alt = b;
  item.appendChild(imgItem);
  inner.appendChild(item);

});

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

//carousel.appendChild(indicators)
carousel.appendChild(inner);
carousel.appendChild(prev);
carousel.appendChild(next);

agradecimientos.appendChild(carousel);