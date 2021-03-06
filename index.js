//Constante que apunta al id del tbody
const htmlPokemonListID = document.getElementById("pokemonList");
const htmlItem = document.getElementById("item");
const htmlShowdown=document.getElementById("showdown");
//String donde se almacenaran nuestros elementos en forma de html
let pokemonList = "";
let itemstr="";
let importShowdown="";
let itemname="";
// peticion general
async function requestPokemon(number) {

  
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
  const pokemon = await response.json();

  // url de la imagen del pokemon 
  let urlimagen="https://assets.pokemon.com/assets/cms2/img/pokedex/full/"; 
  // url de la imagen del tipo del pokemon
  let urlimagentipo="https://www.serebii.net/pokedex-bw/type/" + pokemon.types[0].type.name +".gif";
  // url de la imagen del tipo secundario (el pokemon puede que no tenga tipo secundario)
  let urlimagentipo2; 

  // pasar de hectogramos a kilogramos
  let pesokilos=pokemon.weight/10;
  // formula para el peso en libras
  let pesolibras=pesokilos/0.4535923; 

  // Esto es si 0<id<10
  if(pokemon.id%10==pokemon.id) 
    urlimagen=urlimagen+"00"+pokemon.id+".png";
  else
  // Esto si 10<=id<100
    if(pokemon.id%100==pokemon.id) 
      urlimagen=urlimagen+"0"+pokemon.id+".png";
    else
      // Esto si 100<=id
      urlimagen+=pokemon.id+".png"; 

  let canttipos=0;
   // checa cuantos tipos tiene el pokemon (max 2)
  for(var prop in pokemon.types)
  {
    canttipos++;
  }
  
  //Poner el nombre con la primera letra en mayusculas
  const firstLetter = pokemon.name.charAt(0).toUpperCase();
  pokemon.name = firstLetter + pokemon.name.slice(1);

  pokemonList += `<tr>
                    <td scope="row" class="pID">${pokemon.id} </td>
                    <td>${pokemon.name}</td>
                    <td><figure><img src="${urlimagen}"></figure></td>
                    <td>
                      <img src="${urlimagentipo}" href="${urlimagentipo}">`;

  if(canttipos==2) // si tiene 2 tipos entonces pondrá el secundario, de lo contrario no lo coloca
  {
    urlimagentipo2= "https://www.serebii.net/pokedex-bw/type/"+ pokemon.types[1].type.name +".gif";
    pokemonList+=`<img src="${urlimagentipo2}">`;
  }  

  pokemonList+=` 
                    </td>
                    <td>${pesokilos} kgs | ${pesolibras.toFixed(1)} lbs</td>
                </tr>
                `;

  importShowdown+=`<h5>${pokemon.name} @ ${itemname}</h5>
                    </br>`;             
}

async function allPokemons() {
  for (let i = 1; i <= 6; i++) {
    let c=Math.floor((Math.random() * 800) + 1);
    await requestPokemon(c);
  }
  htmlPokemonListID.innerHTML += pokemonList;
  htmlShowdown.innerHTML+=importShowdown;
}

async function requestRandomItem()
{
  const itemArray = [581,249,253,683,245,209,274,197,247,211];

  let random=Math.floor((Math.random() * 9));
  let itemid = itemArray[random]

  const response = await fetch(`https://pokeapi.co/api/v2/item/${itemid}`);
  const item = await response.json();


 
  
  let url="https://img.pokemondb.net/sprites/items/"+item.name+".png";

  //Poner en mayusculas la primera leta del item.name

  const firstLetter = item.name.charAt(0).toUpperCase();
  item.name = firstLetter + item.name.slice(1)
  itemname=item.name;
  itemstr=`<div>
          <figure><img src="${url}" class="mx-auto d-block" class="img-fluid" style="min-width:70px;" >${itemid}</figure>

          <h5>${item.name}</h4>`;
  if(item.cost==0)
  {
    itemstr+=`This item cannot be bought in Official Pokémon Centers`;
  }        
  else
  {
    itemstr+=`<p>${item.cost} ₽</p>
        </div>
  `;
  }
  
}

async function showItem()
{
  await requestRandomItem();
  htmlItem.innerHTML=itemstr;
}



showItem();
allPokemons();
