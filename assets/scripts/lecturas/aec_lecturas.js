var getParams = function (url) {
    var params = {}
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

  Vue.component("tabs", {
      template: `
            <div>
                <div class="tabs">
                  <div v-for="tab in tabs" class="tab col-sm-2" align="center" @click="hideFilters"> 
                    <a :href="tab.href" :target="tab.externalLink ? '_blank' : ''" @click="selectTab(tab)">
                        <img :src="tab.img" :class="{ 'is-active': tab.isActive }" width="100%" height="100px" :alt="tab.name" />
                    </a>
                  </div>
                </div>

                <div class="tabs-details">
                    <slot></slot>
                </div>
            </div>
        `,

      data() {
        return { tabs: [] };
      },

      created() {
        this.tabs = this.$children;
      },
      methods: {
        selectTab(selectedTab) {
          this.tabs.forEach((tab) => {
            tab.isActive = tab.name == selectedTab.name;
          });
        },
        hideFilters() {
            this.$parent.showFilters = false;
        }
      }
  });

  Vue.component("tab", {
      template: `

            <div v-show="isActive"><slot></slot></div>

        `,

      props: {
        name: { required: true },
        img: { required: true },
        selected: { default: false },
        externalLink: { default: '' }
      },

      data() {
        return {
          isActive: false
        };
      },

      computed: {
        href() {
            if(this.externalLink != "") {
                return this.externalLink;
            } else {
                return "#" + this.name.toLowerCase().replace(/ /g, "-");
            }
        }
      },

      mounted() {
        this.isActive = this.selected;
      }
  });

var app = new Vue({
        el: '#app',
        data: {
        search: '',
        url: window.location.origin,
        params: getParams(window.location.href),
        level: "",
        URLImages: "/assets/images/lecturas/",
        sections: [],
        filteredBooks: [],
        categoryTitle: "Libros",
        showFilters: false,
        checkedCategories: [],
        books: [],
        baseUrl: 'https://jsonplaceholder.typicode.com/',
        page: 1,
        perPage: 2,
        pages: [],
        langs: ['JavaScript', 'PHP', 'HTML', 'CSS', 'Ruby', 'Python', 'Erlang'],
        //paginate: ['books'],
        audiobooks: [],
        categories: [],
        allbooks: [],
        pdfs: [],
    },
    methods: {
        addBook(book){
            if(typeof book === 'undefined') {return};

            this.filteredBooks.push(book);
        },
        setOptions (e) {

            this.checkedCategories = [e.target.value];

            this.filterbooksBy(e);

        },
        filterbooksBy (category) {

            if(category.target.value === "Todos" || category.target.checked === false){ this.showAllBooks(); this.categoryTitle == "Libros"; return; }

            var filteredBooks = _.find(this.allbooks, function(book){ return book.name == category.target.value ; });

            console.log("Category: " + category.target.value);
            console.log([filteredBooks]);

            if (typeof filteredBooks === 'undefined'){return}

            this.books = [filteredBooks];
            this.categoryTitle = category.target.value;

        },
        searchBooks () {

            var arrayOfBooks = [];
            var foundBooks = [];
            var books = [];
            var _self = this;

            _.each(this.allbooks, function(category, index){

                _.each(category.books, function(books, index){
                    arrayOfBooks.push(books);
                })

                foundBooks = category.books.filter(book => {
                    return book.name.toLowerCase().includes(_self.search.toLowerCase());
                })    

                if(foundBooks.length > 0){
                    books.push({name: category.name, books: foundBooks});
                }

            });

            this.books = books;

        },
        showAllBooks() {
            this.books = this.allbooks;
        },
        getBooks () {

                fetch(this.url + '/assets/scripts/lecturas/lecturas_'+this.slug(this.level)+'.json')
                    .then(response => response.json())
                    .then(json => {
                        this.sections = json;
                        //this.books = this.sections[1].books;
                        var _self = this;

                        var audioBooks = _.findWhere(this.sections, {name: 'Audiolibros'});
                        if(typeof audioBooks !== 'undefined') {
                            this.audiobooks = audioBooks.audiobooks;
                        }
                        
                        var lecturasPDF = _.findWhere(this.sections, {name: 'PDF'});
                        if(typeof lecturasPDF !== 'undefined') {
                            this.pdfs = _.map(lecturasPDF.books, function(books, key){
                                return { name : key, books : books };
                            });
                        }

                        var lecturaUnicef = _.findWhere(this.sections, {name: 'Lecturas Unicef'});
                        if(typeof lecturaUnicef !== 'undefined') {
                            this.books = _.map(lecturaUnicef.books, function(books, key){
                                return { name : key, books : books };
                            });
                        }

                        this.allbooks = this.books;

                        this.categories = _.pluck(this.books, "name");
                    })

        },
        setBooks () {
            let numberOfPages = Math.ceil(this.books.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (books) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  books.slice(from, to);
        },
        slug: function(title) {
            var slug = "";
            // Change to lower case            
            slug = title.replace(/^\s+|\s+$/g, '');
            slug = slug.toLowerCase();

            // remove accents, swap ñ for n, etc
            var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
            var to   = "aaaaaeeeeeiiiiooooouuuunc------";
            for (var i=0, l=from.length ; i<l ; i++) {
                slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            slug = slug.replace(/[^a-z0-9 -]/g, '')
                .replace(/\s+/g, '_')
                .replace(/-+/g, '_')
                .replace("__", "_")
                .replace("___", "_")
                .replace(/\s*$/g, '');
            
            return slug;
        },
        pathImage: function(folder, imageName) {
            return this.URLImages+this.slug(folder,'_')+'/'+this.slug(imageName,'_')+'.png';
        },
        imageUrlAlt(event) {
            event.target.src = this.URLImages+"default.png";

            event.stopPropagation();
        }
    },
    created() {
        
        var param = this.params.nivel;

        if(typeof param === 'undefined' || param == "") {$("#app").html("");return}

        this.level = param;

        this.getBooks();

    },
    watch: {
        books () {
            //this.setPages();
        }
    },
    computed: {
        searchBooks() {
            /*return this.books.filter(book => {
                //if(filter == "title"){
                    return book.name.toLowerCase().includes(this.search.toLowerCase());
                //}
                //if(filter == "category"){
                //    return book.category.toLowerCase().includes(this.search.toLowerCase());
                //}
            })*/
        },
        displayedBooks () {
            return this.paginate(this.books);
        },
        breadcrumbText: function() {
            return "Educación "+ this.level;
        },
        breadcrumbUrl: function() {
            if(this.level == "especial" || this.level == 'adultos'){return "../niveles/e"+this.level}

            return "../niveles/"+this.level;
        }
    }
})