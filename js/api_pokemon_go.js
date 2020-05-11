import { PokemonApi } from "./api_pokemon.js";

export class ApiPokemonGo {
    constructor() {
        this.rapidapiHost = "pokemon-go1.p.rapidapi.com";
        this.rapidapiKey = "d0613d775dmshe972982f04ae657p142806jsn06c08a494c62";
        this.pokeApi = new PokemonApi();
    }

    async obtenerPokemons() {
        let pokemons;
        const peticion = await fetch(
            "https://pokemon-go1.p.rapidapi.com/released_pokemon.json",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
                    "x-rapidapi-key":
                        "d0613d775dmshe972982f04ae657p142806jsn06c08a494c62",
                },
            }
        );
        const respuesta = await peticion.json();
        pokemons = await this.obtenerPokemonsConImagenes(respuesta);
        return pokemons;
    }

    async obtenerPokemonsConImagenes(respuesta) {
        const pokemons = Array();
        let datosPokemon;

        for (const key in respuesta) {
            datosPokemon = {
                nombre: respuesta[key].name,
                sprite: await this.obtenerSprite(
                    respuesta[key].name.toLowerCase()
                )
            };
            pokemons.push(datosPokemon);
        }

        return pokemons;
    }

    async obtenerSprite(pokemon) {
        const pokemonsNoValidos = [
            "nidoran♀",
            "nidoran♂",
            "farfetch’d",
            "mr. mime",
            "deoxys",
            "wormadam",
            "mime jr.",
            "giratina",
            "basculin",
            "darmanitan",
            "tornadus",
            "thundurus",
            "landorus",
            "meltan",
            "melmetal",
        ];
        if (pokemonsNoValidos.includes(pokemon)) {
            pokemon = this.obtenerPokemonValido(pokemon);
        }
        const sprite = await this.pokeApi.obtenerSpritePokemon(pokemon);
        return sprite;
    }

    obtenerPokemonValido(pokemon) {
        switch (pokemon) {
            case "nidoran♀":
                return "nidoran-f";
                break;
            case "nidoran♂":
                return "nidoran-m";
                break;
            case "farfetch’d":
                return "farfetchd";
                break;
            case "mr. mime":
                return "mr-mime";
                break;
            case "deoxys":
                return "deoxys-normal";
                break;
            case "wormadam":
                return "wormadam-plant";
                break;
            case "mime jr.":
                return "mime-jr";
                break;
            case "giratina":
                return "giratina-altered";
                break;
            case "basculin":
                return "basculin-red-striped";
                break;
            case "darmanitan":
                return "darmanitan-standard";
                break;
            case "tornadus":
                return "tornadus-incarnate";
                break;
            case "thundurus":
                return "thundurus-incarnate";
                break;
            case "landorus":
                return "landorus-incarnate";
                break;
            case "meltan":
                return "pikachu";
                break;
            case "melmetal":
                return "pikachu";
                break;
        }
    }

    async obtenerPokemonsEstadisticas(){
        const peticion = await fetch(
            "https://pokemon-go1.p.rapidapi.com/pokemon_stats.json",
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
                    "x-rapidapi-key":
                        "d0613d775dmshe972982f04ae657p142806jsn06c08a494c62",
                },
            }
        );

        const responseJson = await peticion.json();
        
        return {
            responseJson
        }
    }

    async obtenerEstadisticas(pokemon){
        const pokemonsEstadisticas =  await this.obtenerPokemonsEstadisticas();

        const poke = pokemonsEstadisticas.responseJson.find(pokemonArray => pokemonArray.pokemon_name === pokemon);
        return poke;
        
        
    }
}
