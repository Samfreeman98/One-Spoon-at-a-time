let pokemonRepository = (function () {
  let pokemonList = [];
  //pokemon API
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //When buttons are clicked the pokemons names are logged
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.type;
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  //Returns an object with all functions assigned as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//forEach loop going over objects in array starting with index 0
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
