// array with Pokemon objects
let pokemonList=[];
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
        type: ['Ghost','Poison'],
        height: 1.5,
    }
]

for (let i = 0; i < pokemonList.length; i++) {
    let pokemonName = pokemonList[i].name;
    let pokemonHeight = pokemonList[i].height;
    
    let label = '';
    
    if (pokemonHeight > 1.5) {label = " - Wow that's a big Pokemon!";
    }
  
  document.write(`${pokemonName} (height: ${pokemonHeight}${label}) <br>`);
  }
