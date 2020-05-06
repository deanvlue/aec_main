const vLinks = [
  {
    id: "1",
    titulo: "Un millón de estrellas",
    url:
      "https://www.aprendeencasa.mx/aprende-en-casa/videos/IXTZULsensibilizacion.mp4",
  },
  {
    id: "2",
    titulo: "Un teatro ¿de sombras?",
    url: "https://www.aprendeencasa.mx/assets/videos/libertad_min.mp4",
    // https://res.cloudinary.com/dd1cjovcw/video/upload/v1588525806/videos/libertad_min_lvf2mo.mp4'
  },
  {
    id: "3",
    titulo: "Apaches en acción",
    url: "https://www.aprendeencasa.mx/assets/videos/kokone_circuito_min.mp4",
  },
  {
    id: "4",
    titulo: "La búsqueda del tesoro",
    url:
      "https://www.aprendeencasa.mx/assets/videos/TEPORINGOSbusqueda_tesoro.mp4",
  },
  {
    id: "5",
    titulo: "¡Chic@s en acción!",
    url: "https://www.aprendeencasa.mx/assets/videos/tamandua_min.mp4",
  },
  {
    id: "6",
    titulo: "Danza, juega y gana",
    url: "https://www.aprendeencasa.mx/assets/videos/1_danza_ritmo.mp4",
  },
  {
    id: "7",
    titulo: "Cuerdas divertidas",
    url: "https://www.aprendeencasa.mx/assets/videos/2_danza_cuerda.mp4",
  },
];

new Vue({
  el: "#videosInformativos",
  data: {
    videoLinks: vLinks,
  },
});
