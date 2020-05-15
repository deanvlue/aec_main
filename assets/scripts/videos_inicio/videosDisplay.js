const vLinks = [{
        id: "1",
        titulo: "#GraciasMaestra - Leonora",
        url: "https://www.youtube.com/embed/f8H-7YZeL5o"
    },
    {
        id: "2",
        titulo: "#GraciasMaestro - Maximiliano",
        url: "https://www.youtube.com/embed/HFt15ENRgT0",
        // https://res.cloudinary.com/dd1cjovcw/video/upload/v1588525806/videos/libertad_min_lvf2mo.mp4'
    },
    {
        id: "3",
        titulo: "#GraciasMaestra - Fernanda",
        url: "https://www.youtube.com/embed/YWpaAtcQIow"
    },
    {
        id: "4",
        titulo: "#GraciasMaestra -L",
        url: "https://www.youtube.com/embed/lpBJDQZcP3c"
    },
    {
        id: "5",
        titulo: "#GraciasMaestra - Alex lora",
        url: "https://www.youtube.com/embed/im4hhqE258E"
    },
    {
        id: "6",
        titulo: "#GraciasMaestra - PRE",
        url: "https://www.youtube.com/embed/S9r8omFwsoo"
    }
];

new Vue({
    el: "#videosInformativos",
    data: {
        videoLinks: vLinks
    }
});