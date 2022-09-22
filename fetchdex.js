var app = new Vue({
    el: '#app',
    data: {
        pokelist : fetchdex()
    }
})
var liste = [];

function fetchdex() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
        .then((response) => response.json())
        .then((data) => putInCache(data))
        .catch((erreur) => {
            console.log('erreur !!!!!!!!!!!!');
            console.log(erreur)
        });
}

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
function display(pkmn){ //parametr: object Pokemon
    let div = document.createElement("div");
    let nom = document.createElement("div");
    let img = document.createElement("img");
    let check = document.createElement("input");
    let label = document.createElement("label");
    let div2 = document.createElement("div");

    div.setAttribute("data-url", pkmn.url);
    div.classList.add("pokedex-card");

    img.classList.add("pokedex-img");
    img.src= `img/${pkmn.id}.png`;
    div.appendChild(img);

    nom.innerHTML = `<h3>${pkmn.id} - ${pkmn.name}</h3>`;
    div.appendChild(nom);

    check.setAttribute("type", "checkbox");
    if (pkmn.possessed == true){
        check.checked = true;
    }
    check.id= `${pkmn.id}`;
    check.name = `${pkmn.name}`;
    div2.appendChild(check);

    label.setAttribute("for", check.name);
    label.setAttribute("value", "true");
    label.innerHTML = `Possédé`
    div2.appendChild(label);
    div.appendChild(div2);
    document.getElementById("pokelist").appendChild(div);
}

function putInCache(data){
    let pokemons = data.results;
    console.log(pokemons);
    let i = 1;
    for(let pokemon of pokemons){
        let pkmn = new Pokemon(pokemon.name, i, pokemon.url);
        liste.push(pkmn);
        display(pkmn);
        i++;
    }

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}