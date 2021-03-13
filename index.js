//Constante que apunta al id del tbody
const htmlPokemonListID = document.getElementById("pokemonList");
//String donde se almacenaran nuestros elementos en forma de html
let pokemonList = "";

async function requestPokemon(number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  const pokemon = await response.json();

  pokemonList += `<tr>
                    <td scope="row">${pokemon.id}</td>
                    <td>${pokemon.name}</td>
                    <td>${pokemon.types[0].type.name}</td>
                    <td>${pokemon.weight}</td>
                </tr>
                `;
}

async function allPokemons() {
  for (let i = 1; i <= 10; i++) {
    await requestPokemon(i);
  }

  htmlPokemonListID.innerHTML += pokemonList;
}

allPokemons();
