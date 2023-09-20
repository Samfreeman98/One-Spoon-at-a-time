// array with Pokemon objects
let pokemonRepository = (function () {
    let pokemonList =
        [
            {
                name: "Blastoise",
                type: ['Water'],
                height: 1.6,
            },

            {
                name: "Umbreon",
                type: ['Dark'],
                height: 1,
            },

            {
                name: "Eevee",
                type: ['Normal'],
                height: 0.3,
            },

            {
                name: "Gengar",
                type: ['Ghost', 'Poison'],
                height: 1.5,
            }
        ]
    pokemonList.forEach(function (pokemon) {
        console.log("Name:" + pokemon.name + " Type:" + pokemon.type + " Height:" + pokemon.height);
        let label = "";
        if (pokemon.height > 1.5) {
            label = " - Wow that's a big Pokemon!";
        }
        document.write(`${pokemon.name} (height: ${pokemon.height}${label}) <br>`);
    })

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    return {
        getAll: getAll,
        add: add
    }

})()

