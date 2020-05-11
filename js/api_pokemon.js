export class PokemonApi{
    async obtenerSpritePokemon(pokemon){
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
        const peticion = await fetch(url);
        const respuesta = await peticion.json();
        return respuesta.sprites.front_default
    }
}