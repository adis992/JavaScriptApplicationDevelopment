var ToDo = function (rootElementAll, rootElementActive, rootElementCompleted) { //konstruktor, prima 3 parametra, to su root elementi za sve iteme, za active iteme i za completed iteme

    this.rootElementAll = rootElementAll; //sprema root elemente u svojstva
    this.rootElementActive = rootElementActive;
    this.rootElementCompleted = rootElementCompleted;


    let ToDoItem = function (content, date) {  //   
        this.id = Math.random().toString(36).substring(7);
        this.content = content;
        this.date = date;
        this.completed = false;
    }


    let ToDoItemViewModel = function (toDoItem, views) {   //ovo je view model i on sadrzi podatke i view i ima metodu toJSON koja vraca podatke u JSON formatu (za cuvanje u local storage)
        this.data = toDoItem;
        this.views = views;

        this.toJSON = function () { //metoda koja vraca podatke u JSON formatu (za cuvanje u local storage)
            return this.data; //vraca podatke
        }
    }


    let toDoItems = []; //sprema sve iteme u niz

    //ovo je template za item, ovo je HTML koji se koristi za kreiranje itema
    const TODO_ITEM_TEMPLATE = ` 
        <div class="todo-item-date">
            <span class="day"></span>
            <span class="month"></span>
        </div>
        <div class="todo-item-content">
            <span class="data"></span>
        </div>
        <span class="delete-btn" title="delete"></span>
`;


    function generateToDoItemView(toDoItem) {

        //first, create root element
        let toDoItemRoot = document.createElement('div'); //kreira div element
        toDoItemRoot.classList.add("todo-item"); //dodaje mu klasu todo-item
        toDoItemRoot.setAttribute('data-id', toDoItem.id); //dodaje mu data-id atribut i postavlja ga na id itema
        toDoItemRoot.innerHTML = TODO_ITEM_TEMPLATE; //dodaje mu HTML iz template-a

        toDoItemRoot.getElementsByClassName("day")[0].innerHTML = toDoItem.date.toLocaleString('default', { day: 'numeric' });  //dohvaca element s klasom day i postavlja mu innerHTML na dan iz date objekta
        toDoItemRoot.getElementsByClassName("month")[0].innerHTML = toDoItem.date.toLocaleString('default', { month: 'short' });    //dohvaca element s klasom month i postavlja mu innerHTML na mjesec iz date objekta
        var dataElem = toDoItemRoot.getElementsByClassName("data")[0].innerHTML = toDoItem.content; //dohvaca element s klasom data i postavlja mu innerHTML na content itema
        toDoItemRoot.getElementsByClassName("delete-btn")[0].setAttribute('data-id', toDoItem.id); //dohvaca element s klasom delete-btn i dodaje mu data-id atribut i postavlja ga na id itema

        toDoItemRoot.classList.add(toDoItem.completed ? "completed" : null); //ako je item completed, dodaje mu klasu completed, inace ne dodaje nikakvu klasu

        let toDoItemRootCopy = toDoItemRoot.cloneNode(true);  //kopira root element zato sto nije dozvoljeno da se isti element nalazi na vise mjesta u DOM-u

        rootElementAll.append(toDoItemRoot); //dodaje root element u root element za sve iteme

        if (toDoItem.completed) { //ako je item completed, dodaje root element u root element za completed iteme, inace dodaje u root element za active iteme
            rootElementCompleted.append(toDoItemRootCopy);
        } else {
            rootElementActive.append(toDoItemRootCopy);
        }

        let toDoItemViewModel = new ToDoItemViewModel(toDoItem, [toDoItemRoot, toDoItemRootCopy]); //kreira view model i sprema ga u niz
        toDoItems.push(toDoItemViewModel); //dodaje view model u niz

        //register handlers for delete button
        registerDeleteHandlers(toDoItemViewModel); //registrira handlere za delete button

        //register handlers for click on item
        registerClickHandlers(toDoItemViewModel); //registrira handlere za klik na item

    }


    function registerDeleteHandlers(toDoViewModel) {

        for (let i = 0; i < toDoViewModel.views.length; i++) {
            toDoViewModel.views[i].getElementsByClassName("delete-btn")[0].onclick = function (e) {

                e.stopPropagation(); //zaustavlja event bubbling (event se nece propagirati na roditeljske elemente)
                //znaci ovo brise item iz DOM-a i iz niza
                var id = this.dataset.id;
                var index = toDoItems.findIndex(item => item.data.id === id);

                if (index > -1) {   //ako je pronaden item s tim id-em
                    //remove from array and from DOM
                    toDoItems.splice(index, 1); //brise item iz niza
                    toDoViewModel.views[0].parentNode.removeChild(toDoViewModel.views[0]);  //brise item iz DOM-a
                    toDoViewModel.views[1].parentNode.removeChild(toDoViewModel.views[1]);      //brise item iz DOM-a
                }

                saveToLocalStorage();

            }
        }
    }


    function registerClickHandlers(toDoItemViewModel) { //registrira handlere za klik na item, a hendler je da se item oznaci kao completed ili da se oznaka removed

        for (let i = 0; i < toDoItemViewModel.views.length; i++) {

            toDoItemViewModel.views[i].onclick = function (e) {
                var id = this.dataset.id;
                var index = toDoItems.findIndex(item => item.data.id === id);

                toDoItemViewModel.data.completed = !toDoItemViewModel.data.completed;


                if (toDoItemViewModel.data.completed) {

                    toDoItemViewModel.views[0].classList.add("completed");
                    toDoItemViewModel.views[1].classList.add("completed");
                    rootElementCompleted.appendChild(toDoItemViewModel.views[1]);

                } else {
                    toDoItemViewModel.views[0].classList.remove("completed");
                    toDoItemViewModel.views[1].classList.remove("completed");

                    rootElementActive.appendChild(toDoItemViewModel.views[1]);
                }

                saveToLocalStorage();
            }
        }
    }


    function saveToLocalStorage() {
        localStorage.setItem('todo-data', JSON.stringify(toDoItems));
    }


    function loadFromLocalStorage() {

        var json = localStorage.getItem('todo-data');

        if (json === null)
            return;

        let toDoItems = JSON.parse(json, (key, value) => {
            if (key === "date") {
                value = new Date(value);
            }
            return value;
        });

        if (toDoItems.length === 0)
            return;

        for (let i = 0; i < toDoItems.length; i++) {
            generateToDoItemView(toDoItems[i]);
        }
    }


    loadFromLocalStorage();

    return {

        add: function (content) { //metoda za dodavanje itema ovo je closure, metoda add ima pristup varijablama i funkcijama koje su definirane u konstruktoru
            //korisnik nece moci pristupiti varijablama i funkcijama koje su definirane u konstruktoru, ali ce moci pozivati metodu add
            let toDoItem = new ToDoItem(content, new Date());
            generateToDoItemView(toDoItem); //generira view za item a to je HTML koji se dodaje u DOM

            saveToLocalStorage();

        }

    }

}