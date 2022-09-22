Vue.component('nav-bar', {
    data: function () {
        return {
            links: []
        }
    },
    template: '<nav><a id="title">Pokedex</a><a class="navel">Accueil</a><a class="navel">Mon compte</a><a class="navel">Manger des poireaux</a></nav>'
})

new Vue({ el: '#navbarcomp' })