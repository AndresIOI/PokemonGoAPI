import {Interfaz}  from './interfaz.js';
const ui = new Interfaz();
const pokemons = document.querySelector('.pokemons');

document.addEventListener('DOMContentLoaded',  e => {
    ui.mostrarPokemons(); 
});

pokemons.addEventListener('click',e=>{
    e.preventDefault();
    if(e.target.classList.contains('pokemonInfo')){
        ui.mostarModalInfo(e.target.dataset.name, e.target.dataset.sprite);
    }
    
})


