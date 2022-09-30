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
}

function fetchdex() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
        .then((response) => response.json())
        .then((data) => putInCache(data))
        .catch((erreur) => {
            console.log('erreur !!!!!!!!!!!!');
            console.log(erreur)
        });
}

function fetchdexPossessed() {
    fetch('https://localhost:7036/api/Pokemons')
        .then((response)=> response.json())
        .then((data)=>putInCachePossessed(data))
        .catch((erreur) => {
            console.log('erreur !!!!!!!!!!!!');
            console.log(erreur)
        });
}

function putInCache(data){
    let pokemons = data.results;
    document.getElementById('pokelist').textContent = '';
    liste = [];
    let i = 1;
    for(let pokemon of pokemons){
        let pkmn = new Pokemon(pokemon.name, i, pokemon.url);
        liste.push(pkmn);
        i++;
    }
    displayList(liste);
}

function displayList(li){

    console.log(li.length);
    for (let pokemon of li){
        display(pokemon);
    }
}

function putInCachePossessed(data){
    let pokemons = data;

    let i = 1;
    liste = [];
    document.getElementById('pokelist').textContent = '';
    for(let pokemon of pokemons){
        //Fetch sur PokeApi avec l'id de chaque pokemon de la collection
        fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon.id)
            .then((response)=> response.json())
            .then((pokemonbyid)=> {
                display(pokemonbyid);
            } )
            .catch((erreur) => {
                console.log('erreur !!!!!!!!!!!!');
                console.log(erreur)
            });
    }
}

function display(pkmn){ //parametre: object Pokemon

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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
