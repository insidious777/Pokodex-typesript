import React from "react";
import '../Styles/showPokemon.css'
import PokemonCardProps from "../Interfaces/PokemonCardProps";


function PokemonCard({pokemon, onClick}:PokemonCardProps){
    return(
        <div className='pokemonCard' onClick={() => onClick(pokemon)} key={pokemon.id}>
            <img className='pokemonImage' alt={pokemon.name} src={pokemon.sprites.front_default}/>
            <p className='pokemonName'>{pokemon.name}</p>
            <div className='pokemonTypes'>
                {pokemon.types.map((e) => {
                    return (
                        <div key={e.slot} className='pokemonType'>{e.type.name}</div>
                    )})}
            </div>
        </div>
    )
}

export default PokemonCard