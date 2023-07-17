var allItems;
var headerButtons;

window.addEventListener("load", function () {  //osigurava da se skripta izvrsi tek nakon ucitavanja stranice

    headerButtons = document.getElementsByClassName("header-cell"); //dohvaca sve elemente s klasom header-cell
    allItems = document.getElementById("all-items");  //dohvaca element s id-em all-items   


    for (let i = 0; i < headerButtons.length; i++) {

        headerButtons[i].onclick = function () {
            openTab(parseInt(this.id.substr(this.id.length - 1)));
        }

    }

    examineHash();  //provjerava hash i otvara odgovarajuci tab (ako je hash prazan, otvara se prvi tab)


    var contentInput = document.getElementById("content");
    var addButton = document.getElementById("add-btn");


    var allItemsContainer = document.getElementById("all-items-container");
    var activeItemsContainer = document.getElementById("active-items-container");
    var completedItemsContainer = document.getElementById("completed-items-container");

    var toDoApp = new ToDo(allItemsContainer, activeItemsContainer, completedItemsContainer);

    addButton.onclick = function () {
        if (contentInput.value !== '') {
            toDoApp.add(contentInput.value);
            contentInput.value = '';
        }
    };


});

window.addEventListener("hashchange", function (e) {
    examineHash();
});


function examineHash() {  //logika funkcije iznad, examine has je funkcija koja se poziva na load i na hashchange
    switch (window.location.hash) { //provjerava hash i otvara odgovarajuci tab (ako je hash prazan, otvara se prvi tab)
        case '#all-items':
        case "":
            openTab(1);
            break;
        case '#pending-items':
            openTab(2);
            break;
        case '#active-items': //ako se dodaju novi tabovi, treba dodati i njihove case-ove
            openTab(3);
            break;
    }
}


function openTab(no) {  //no je broj taba koji se otvara        

    document.querySelectorAll('.header-cell').forEach(item => {  //dohvaca sve elemente s klasom header-cell i dodaje im klasu inactive-header-cell
        item.classList.add("inactive-header-cell");             //koja ih vizualno oznacava kao neaktivne 
    });

    document.getElementById("tab-" + no).classList.remove("inactive-header-cell");  //uklanja klasu inactive-header-cell s elementa koji se otvara
    //OVO SE JOS ZOVE I RUTIRANJE
    switch (no) {    //pomice all-items div lijevo ili desno ovisno o broju taba koji se otvara
        case 1:
            allItems.style.marginLeft = "0%";
            //ovo ispod je za signle page aplikaciju
            window.location.hash = '#all-items';  //mijenja hash u ovisnosti o otvorenom tabu i to je identifikator taba odnosno url
            break;
        case 2:
            allItems.style.marginLeft = "-100%";
            window.location.hash = '#pending-items'; //mijenja hash u ovisnosti o otvorenom tabu i to je identifikator taba odnosno url
            break;
        case 3:
            allItems.style.marginLeft = "-200%";
            window.location.hash = '#active-items'; //mijenja hash u ovisnosti o otvorenom tabu i to je identifikator taba odnosno url
            break; //ako se dodaju novi tabovi, treba dodati i njihove case-ove
    }
}