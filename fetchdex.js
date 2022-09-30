var app = new Vue({
    el: '#app',
    data: {
        pokelist : fetchdex()
    }
})
var liste = [];

let Pokemon = function(name, id, url, possessed){
    this.name = capitalizeFirstLetter(name);
    this.id = id;
    this.url = url;
    // this.possessed = true;
    if (possessed != null){
        this.possessed = possessed;
    }else{
        this.possessed = false;
    }
    //Pour tester
    if (id < 151){
        this.possessed = true;
    }
}

function fetchdex() {
    //fetch("https://localhost:7036/api/Pokemons")
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
        .then((response) => response.json())
        .then((data) => putInCache(data))
        .catch((erreur) => {
            console.log('erreur !!!!!!!!!!!!');
            console.log(erreur)
        });
}

function fetchdexPossessed() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
        .then((response) => response.json())
        .then((data) => putInCachePossessed(data))
        .catch((erreur) => {
            console.log('erreur !!!!!!');
            console.log(erreur)
        });
}


function display(pkmn){ //parametr: object Pokemon
    let card = document.createElement("div");
    let nom = document.createElement("div");
    let img = document.createElement("img");
    let check = document.createElement("input");
    let label = document.createElement("label");
    let div2 = document.createElement("div");

    card.setAttribute("data-url", pkmn.url);
    card.classList.add("pokedex-card");

    img.classList.add("pokedex-img");
    img.src= `img/${pkmn.id}.png`;
    card.appendChild(img);

    nom.innerHTML = `<h3>${pkmn.id} - ${pkmn.name}</h3>`;
    card.appendChild(nom);

    check.setAttribute("type", "checkbox");
    if (pkmn.possessed){
        check.checked = true;
    }
    check.id= `${pkmn.id}`;
    check.name = `${pkmn.name}`;
    div2.appendChild(check);

    label.setAttribute("for", check.name);
    label.setAttribute("value", "true");
    label.innerHTML = `Possédé`;
    div2.appendChild(label);
    card.appendChild(div2);
    document.getElementById("pokelist").appendChild(card);
}

function putInCache(data){
    let pokemons = data.results;
    console.log(pokemons);
    liste = [];
    let i = 1;
    for(let pokemon of pokemons){
        let pkmn = new Pokemon(pokemon.name, i, pokemon.url);
        liste.push(pkmn);
        i++;
    }
    displayList(liste);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function displayList(li){
    let pokelist = document.getElementById("pokelist");
    pokelist.textContent = "";
    for (let pokemon of li){
        display(pokemon);
    }
}


function putInCachePossessed(data){
    let pokemons = data.results;
    console.log(pokemons);
    let i = 1;
    liste = [];
    for(let pokemon of pokemons){

        let pkmn = new Pokemon(pokemon.name, i, pokemon.url);
        if (pkmn.possessed){
            liste.push(pkmn);
        }
        i++;
    }
    displayList(liste);

}
function filterPossessed(){
    for (let pokemon of liste){
        if (pokemon.possessed == true) {
            display(pokemon);
        }
    }
}