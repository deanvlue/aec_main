(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{290:function(e,t,o){"use strict";o.r(t);var r={data:function(){return{perRow:3,maxRow:2,videos:[{id:1,img:"",descripcion:"Introducción a mi cuenta G Suite para la Educación - CDMX",src:"https://www.youtube.com/embed/mFnjGYGL_zg"},{id:2,img:"",descripcion:"Google Drive y archivos de colaboración",src:"https://www.youtube.com/embed/twFYT6MG3sY"},{id:3,img:"",descripcion:"Formularios de Google",src:"https://www.youtube.com/embed/2bfSsl18nkg"},{id:4,img:"",descripcion:"Crea conferencias productivas",src:"https://www.youtube.com/embed/rvW7JZvWt68"},{id:5,img:"",descripcion:"Optimiza y enriquece tu Classroom",src:"https://www.youtube.com/embed/Xvs-e4txQno"}]}},computed:{displayVideos:function(){this.perRow,this.maxRow;for(var e=[],t=0,o=0,i=0;i<this.maxRow;i++)t=i*(this.maxRow+i),o=(i+1)*this.perRow,e.push(this.videos.slice(t,o));return e}}},c=o(27),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h1",[e._v(" Webinars anteriores ")]),e._v(" "),o("hr"),e._v(" "),o("div",{staticClass:"videoGrid"},e._l(e.displayVideos,(function(t){return o("b-row",{key:t.index},e._l(t,(function(video){return o("b-col",{key:video.id},[o("b-embed",{attrs:{type:"iframe",aspect:"16by9",src:video.src,allowfullscreen:""}}),e._v(" "),o("p",{staticClass:"text-center"},[e._v(e._s(video.descripcion))])],1)})),1)})),1)])}),[],!1,null,null,null);t.default=component.exports}}]);