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
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.weight = details.weight;
        pokemon.height = details.height;
        pokemon.types = [];
        for (var i = 0; i < details.types.length; i++) {
          pokemon.types.push(details.types[i].type.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(title, text, img) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    //Adds new content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " +text;

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", img);
    imageElement.setAttribute("width", "304");
    imageElement.setAttribute("height", "228");
    imageElement.setAttribute("alt", "Pokemon image")

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" &&
    modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item.name, item.height, item.imageUrl);
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
