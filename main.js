const listaPokemons = document.querySelector("#lista-pokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let url = "https://pokeapi.co/api/v2/pokemon/";

// Array para guardar todos los Pokémon cargados
let todosPokemons = [];

// Función para mostrar un Pokémon en el DOM
function mostrarPokemons(poke) {
    let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');

    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId;
    }

    const div  = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}M</p>
                <p class="stat">${poke.weight}KG</p>
            </div>
        </div>
    `;
    listaPokemons.append(div);
}

// Función para cargar los 151 Pokémon y guardarlos en memoria
async function cargarPokemons() {
    const fetches = [];
    for(let i = 1; i <= 151; i++){
        fetches.push(fetch(url + i).then(res => res.json()));
    }
    todosPokemons = await Promise.all(fetches);
    todosPokemons.forEach(poke => mostrarPokemons(poke));
}

// Llamamos a la función al cargar la página
cargarPokemons();

// Filtrado por tipo o ver todos
botonesHeader.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonId = boton.id;
        listaPokemons.innerHTML = ""; // Limpiamos antes de mostrar

        if(botonId === "ver-todos"){
            todosPokemons.forEach(pokemones => mostrarPokemons(pokemones));
        } else {
            const filtrados = todosPokemons.filter(filtro => 
                filtro.types.some(tipo => tipo.type.name === botonId)
            );
            filtrados.forEach(pokemion => mostrarPokemons(pokemion));
        }
    });
});
