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
    let pokemonList = $(".pokemon-list");

    //Creating variables for list items and buttons.
    let listItem = $("<li></li>");
    let button = $("<button></button>");
    listItem.addClass("list=group-item", "mx-auto");

    //Button text is the name of the pokemon
    button.text(pokemon.name);
    //Class is added for CSS styling
    button.addClass("button-class");

    button.attr("data-target", "#exampleModal");
    button.attr("data-toggle", "modal");

    //allows buttons and list to show on webpage
    listItem.append(button);
    pokemonList.append(listItem);

    //When buttons are clicked the pokemons names are logged
    button.on("click", function () {
      showDetails(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //Clears excisting content of modal title and body
    modalTitle.empty();
    modalBody.empty();

    //Creates element for name in modal content
    let nameElement = $("<h1 class='modal-title'>" + pokemon.name + "</h1>");

    //Creates element for height in modal content
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");

    //Creates element for weight in modal content
    let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");

    //Creates element for type in modal content
    let typesElement = $(
      "<p>" + "types : " + pokemon.types.join(", ") + "</p>"
    );

    //Creates element for abilities in modal content
    let abilitiesElement = $(
      "<p>" + "abilities : " + pokemon.abilities.join(", ") + "</p>"
    );

    //Creats img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);

    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);

    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
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
            height: item.height,
            types: item.types,
            weight: item.weight,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.weight = details.weight;
        pokemon.height = details.height;
        pokemon.types = details.types.map(function (type) {
          return type.type.name;
        });
        pokemon.abilities = details.abilities.map(function (ability) {
          return ability.ability.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
