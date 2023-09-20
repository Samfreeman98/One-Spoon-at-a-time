// array with Pokemon objects
let pokemonList = [];
pokemonList = [
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

