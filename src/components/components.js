Vue.component('nav-bar', {
    data: function () {
        return {
            links: []
        }
    },
    template: '<nav><a id="title">Pokedex</a><a class="navel">Accueil</a><a class="navel">Mon compte</a><a class="navel">Manger des poireaux</a></nav>'
})

new Vue({ el: '#navbarcomp' })

Vue.component('filterpossessed-button',{
    template: '<button onClick="fetchdexPossessed()">Possédés</button>'
})

Vue.component('filterall-button',{
    template: '<button onClick="fetchdex()">Tous</button>'
})

new Vue({ el : '#filters'})