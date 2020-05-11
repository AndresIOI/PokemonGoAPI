import { ApiPokemonGo } from './api_pokemon_go.js';

export class Interfaz {
  constructor() {
    this.apiPokemonGo = new ApiPokemonGo();
  }
  mostrarPokemons() {
    const spinner = document.querySelector(".sk-fading-circle");
    spinner.removeAttribute('hidden');

    this.apiPokemonGo.obtenerPokemons()
      .then(pokemons => {
        let html = '';

        const pokemonsDiv = document.querySelector('.pokemons');
        html += `<div class="row justify-content-center">`;
        pokemons.forEach(pokemon => {

          html += `
                    <div class="col-3 pokemon">
                            <p>${pokemon.nombre}</p>
                            <p>
                                <img src=${pokemon.sprite} class="pokemonInfo" data-name=${pokemon.nombre}  data-sprite=${pokemon.sprite} data-toggle="modal" data-target="#exampleModal"></img>
                            </p>
                    </div>
                `;
        });
        html += "</div>";
        pokemonsDiv.innerHTML = html;
        spinner.setAttribute('hidden', '');

      });

  }

    mostarModalInfo(pokemon, urlSprite) {
      this.apiPokemonGo.obtenerEstadisticas(pokemon).
        then(pokeInfo => {          
          document.querySelector('.modal-title').innerText = pokemon;
          document.querySelector('.pokemon_img').src = urlSprite;
          document.querySelector('.ataque').value = pokeInfo.base_attack;
          document.querySelector('.defensa').value = pokeInfo.base_defense;
          document.querySelector('.estamina').value = pokeInfo.base_stamina;
        });
  }





}

