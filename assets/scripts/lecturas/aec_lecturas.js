"use strict";

var levels = [{
  id: 1,
  name: "Preescolar",
  grades: [{
    id: 1,
    name: "Primer grado"
  }, {
    id: 2,
    name: "Primer grado"
  }, {
    id: 3,
    name: "Primer grado"
  }]
}];
var categories = [{
  id: 1,
  name: "Cuentos con valores"
}, {
  id: 2,
  name: "Cuentos de princesas y príncipes"
}, {
  id: 3,
  name: "Cuentos de animales"
}, {
  id: 4,
  name: "Cuentos infantiles clásicos para niños"
}, {
  id: 5,
  name: "Cuentos sobre tolerancia y bullying"
}, {
  id: 6,
  name: "Cuentos infantiles de amistad"
}, {
  id: 7,
  name: "Cuentos infantiles de dinosaurios"
}, {
  id: 8,
  name: "Cuentos inventados por niños y otras colaboraciones"
}, {
  id: 9,
  name: "Cuentos de piratas para niños"
}, {
  id: 10,
  name: "Cuentos infantiles de amor y San Valentín"
}, {
  id: 11,
  name: "Cuentos de sirenas para niños"
}, {
  id: 12,
  name: "Cuentos de colaboraciones"
}, {
  id: 13,
  name: "Cuentos de Navidad para niños"
}, {
  id: 14,
  name: "Cuentos de brujas para niños"
}, {
  id: 15,
  name: "Cuentos de miedo para niños"
}, {
  id: 16,
  name: "Cuentos para dormir"
}, {
  id: 17,
  name: "Cuentos de dragones para niños"
}, {
  id: 18,
  name: "Cuentos de hadas para niños"
}, {
  id: 19,
  name: "Microcuentos infantiles"
}];

var getParams = function getParams(url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }

  return params;
};

Vue.use(VueLazyload);
Vue.component("tabs", {
  template: "\n<div>\n<div class=\"tabs\">\n<div v-for=\"tab in tabs\" class=\"tab col-sm-2\" align=\"center\" @click=\"hideFilters\"> \n<a :href=\"tab.href\" :target=\"tab.externalLink ? '_blank' : ''\" @click=\"selectTab(tab)\">\n<img :src=\"tab.img\" :class=\"{ 'is-active': tab.isActive }\" width=\"100%\" height=\"100px\" :alt=\"tab.name\" />\n                    </a>\n                  </div>\n                </div>\n\n                <div class=\"tabs-details\">\n                    <slot></slot>\n                </div>\n            </div>\n        ",
  data: function data() {
    return {
      tabs: []
    };
  },
  created: function created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab: function selectTab(selectedTab) {
      this.tabs.forEach(function (tab) {
        tab.isActive = tab.name == selectedTab.name;
      });
    },
    hideFilters: function hideFilters() {
      this.$parent.showFilters = false;
    }
  }
});
Vue.component("tab", {
  template: "\n\n            <div v-show=\"isActive\"><slot></slot></div>\n\n        ",
  props: {
    name: {
      required: true
    },
    img: {
      required: true
    },
    selected: {
      default: false
    },
    externalLink: {
      default: ''
    }
  },
  data: function data() {
    return {
      isActive: false
    };
  },
  computed: {
    href: function href() {
      if (this.externalLink != "") {
        return this.externalLink;
      } else {
        return "#" + this.name.toLowerCase().replace(/ /g, "-");
      }
    }
  },
  mounted: function mounted() {
    this.isActive = this.selected;
  }
});
var app = new Vue({
  el: '#app',
  data: {
    env: "prod",
    search: '',
    tabs: [],
    books: [],
    categories: [],
    audiobooks: [],
    pdfs: [],
    checkedCategories: [],
    url: window.location.origin,
    params: getParams(window.location.href),
    level: "",
    URLImages: "/assets/images/lecturas/",
    showFilteredItems: true,
    categoryTitle: "Libros",
    showFilters: false,
    page: 1,
    perPage: 2,
    pages: [],
    paginate: ['books'],
    allbooks: []
  },
  methods: {
    next: function next() {
      var currentPage = this.$refs.paginator[0].currentPage;
      var lastPage = this.$refs.paginator[0].lastPage;
      this.debug("---------------------------------");
      this.debug("Current page: " + this.$refs.paginator[0].currentPage);
      this.debug("Last page: " + this.$refs.paginator[0].lastPage);
      this.debug("Page item counts: " + this.$refs.paginator[0].pageItemsCount);
      this.debug("Items per page: " + this.$refs.paginator[0].per);

      if (currentPage < lastPage - 1) {
        this.$refs.paginator[0].goToPage(currentPage + 2);
      }
    },
    prev: function prev() {
      var currentPage = this.$refs.paginator[0].currentPage;
      var lastPage = this.$refs.paginator[0].lastPage;
      this.debug("---------------------------------");
      this.debug("Current page: " + this.$refs.paginator[0].currentPage);
      this.debug("Last page: " + this.$refs.paginator[0].lastPage);
      this.debug("Page item counts: " + this.$refs.paginator[0].pageItemsCount);
      this.debug("Items per page: " + this.$refs.paginator[0].per);

      if (currentPage > 0) {
        this.$refs.paginator[0].goToPage(currentPage--);
      }
    },
    setOptions: function setOptions(e) {
      this.checkedCategories = [e.target.value];
      this.filterbooksBy(e);
    },
    filterbooksBy: function filterbooksBy(category) {
      this.search = '';
      this.books = this.allbooks;
      this.debug("CategoryId: [" + category.target.value + "]");

      if (category.target.value === "Todos" || category.target.checked === false) {
        this.showAllBooks();
        this.categoryTitle == "Libros";
        return;
      }

      this.books = this.books.filter(function (book) {
        return book.category == category.target.value;
      });
      this.categoryTitle = _.findWhere(this.categories, {
        id: parseInt(category.target.value)
      }).name;
    },
    showAllBooks: function showAllBooks() {
      this.books = this.allbooks;
      this.showFilters = false;
      this.checkedCategories = ["Todos"];
      this.debug("Show all books.");
    },
    getTabs: function getTabs() {
      var _this = this;

      fetch(this.url + '/assets/scripts/lecturas/lecturas_' + this.level + '.json').then(function (response) {
        return response.json();
      }).then(function (json) {
        _this.tabs = json;

        var lecturasPDF = _.findWhere(_this.tabs, {
          name: 'Lecturas PDF'
        });

        if (typeof lecturasPDF !== 'undefined') {
          _this.pdfs = _.map(lecturasPDF.books, function (books, key) {
            return {
              name: key,
              books: books
            };
          });
        }

        var audioBooks = _.findWhere(_this.tabs, {
          name: 'Audiolibros'
        });

        if (typeof audioBooks !== 'undefined') {
          _this.audiobooks = audioBooks.audiobooks;
        }

        var lecturaUnicef = _.findWhere(_this.tabs, {
          name: 'Lecturas Unicef'
        });

        if (typeof lecturaUnicef !== 'undefined') {
          _this.books = lecturaUnicef.books;
        }

        _this.allbooks = _this.books;
      });
    },
    slug: function slug(title) {
      if (typeof title === 'undefined') {
        return;
      }

      ;
      var slug = ""; // Change to lower case            

      slug = title.replace(/^\s+|\s+$/g, '');
      slug = slug.toLowerCase(); // remove accents, swap ñ for n, etc

      var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
      var to = "aaaaaeeeeeiiiiooooouuuunc------";

      for (var i = 0, l = from.length; i < l; i++) {
        slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      slug = slug.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '_').replace(/-+/g, '_').replace("__", "_").replace("___", "_").replace(/\s*$/g, '');
      return slug;
    },
    pathImage: function pathImage(imageTitle) {
      return this.URLImages + level + '/' + this.slug(imageTitle, '_') + '.png';
    },
    imageUrlAlt: function imageUrlAlt(event) {
      event.target.src = this.URLImages + "default.svg";
      event.stopPropagation();
    },
    debug: function debug(message) {
      if (this.env === "dev") {
        console.log(message);
      }

      ;
    },
    keypress: function keypress() {
      var lastPage = this.$refs.paginator[0].lastPage;
      this.debug("#books:[" + this.$refs.paginator[0].list.length + "]");

      if (this.$refs.paginator[0].list.length > 0) {
        this.showFilteredItems = true;

        if (lastPage == 0) {
          this.$refs.paginator[0].goToPage(0);
        }

        if (this.$refs.paginator[0].list.length == 0) {
          this.showFilteredItems = false;
        }
      }

      if (this.$refs.paginator[0].list.length <= 0) {
        this.showFilteredItems = false;
      }
    },
    backspace: function backspace() {
      var lastPage = this.$refs.paginator[0].lastPage;

      if (this.$refs.paginator[0].list.length > 0) {
        this.showFilteredItems = true;

        if (lastPage == 0) {
          this.$refs.paginator[0].goToPage(0);
        } else {
          this.$refs.paginator[0].goToPage(1);
        }
      }

      if (this.$refs.paginator[0].list.length <= 0) {
        this.showFilteredItems = false;
      }
    }
  },
  created: function created() {
    var param = this.params.nivel;
    this.categories = categories;

    if (typeof param === 'undefined' || param == "") {
      return;
    }

    this.level = param;
    this.debug("[" + this.level + "]");
    this.getTabs();
  },
  computed: {
    searchBooks: function searchBooks() {
      var _this2 = this;

      var books = this.books.filter(function (book) {
        return _this2.slug(book.title).includes(_this2.slug(_this2.search));
      }); //this.debug("Books #: " + books.length);

      return books;
    },
    breadcrumbText: function breadcrumbText() {
      return "Educación " + this.level;
    },
    breadcrumbUrl: function breadcrumbUrl() {
      if (this.level == "especial" || this.level == 'adultos') {
        return "../niveles/e" + this.level;
      }

      return "../niveles/" + this.level;
    }
  }
});