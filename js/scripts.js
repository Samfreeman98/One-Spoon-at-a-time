let pokemonRepository = (function () {
  //array of pokemon objects
  let pokemonList = [ ]

  //function to return pokemonList-array
  function getAll () {
    return pokemonList
  }

  function add (pokemon) {
    pokemonList.push(pokemon)
  }

  function addListItem (pokemon) {
    //selecting the pokemon-list
    let pokemonList = document.querySelector('.pokemon-list')

    //Creating variables for list items and buttons.
    let listItem = document.createElement('li')
    let button = document.createElement('button')

    //Button text is the name of the pokemon
    button.innerText = pokemon.name
    //Class is added for CSS styling
    button.classList.add('button-class')

    //allows buttons and list to show on webpage
    listItem.appendChild(button)
    pokemonList.appendChild(listItem)

    //When buttons are clicked the pokemons names are logged
    button.addEventListener('click', function (event) {
      showDetails(pokemon)
    })
  }
  function showDetails (pokemon) {
    console.log(pokemon)
  }

  //Returns an object with all functions assigned as keys
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  }
})()

//forEach loop going over objects in array starting with index 0
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
})
