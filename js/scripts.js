let pokemonRepository = (function () {

   //array of pokemon objects
   let pokemonList = [{
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

   //function to return pokemonList-array
   function getAll() {
      return pokemonList;
   }

   function add(pokemon) {
      pokemonList.push(pokemon);
   }


   function addListItem(pokemon) {
      //selecting the pokemon-list
      let pokemonList = document.querySelector(".pokemon-list");

      //Creating variables for list items and buttons. 
      let listItem = document.createElement("li");
      let button = document.createElement("button");

      //Button text is the name of the pokemon
      button.innerText = pokemon.name;
      //Class is added for CSS styling
      button.classList.add("button-class");

      //allows buttons and list to show on webpage
      //When buttons are clicked the pokemons names are logged
   //Returns an object with all functions assigned as keys
   return {
      getAll: getAll,
      add: add
   }

})()


//forEach loop going over objects in array starting with index 0
pokemonRepository.getAll().forEach(function (pokemon) {
   console.log("Name:" + pokemon.name + " Type:" + pokemon.type + " Height:" + pokemon.height);
   let label = "";
   if (pokemon.height > 1.5) {
      label = " - Wow that's a big Pokemon!";
   }
   document.write(`${pokemon.name} (height: ${pokemon.height}${label}) <br>`);
})

