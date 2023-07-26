import PokemonsList from "../Interfaces/pokemonsList";
import React, {useEffect, useState} from "react";
import Pokemon from "../Interfaces/pokemon";
import axios from "axios";
import '../Styles/showPokemon.css'

function ShowPokemon(props:PokemonsList){

    const[pokemon,setPokemon]=useState<Pokemon>({
        name:'',
        sprites:{front_default:''},
        types:[{slot:0,type:{name:''}}],
        id:0,
        stats:[{base_stat:0,stat:{name:''}}]
    });
    const [loaded,setLoaded]=useState<boolean>(false);

    useEffect(() => {
        axios.get(props.pokemon)
            .then(res => {
                setPokemon(res.data);
            })
        setLoaded(true)
    },[props.pokemon])

    return(
        <>
            {loaded? <div className='pokemonCard' onClick={() => props.current(pokemon)} key={pokemon.id}>
                <img className='pokemonImage' alt={pokemon.name} src={pokemon.sprites.front_default}/>
                <p className='pokemonName'>{pokemon.name}</p>
                <div className='pokemonTypes'>
                    {pokemon.types.map((e) => {
                        return (
                            <div key={e.slot} className='pokemonType'>{e.type.name}</div>
                        )})}
                </div>
            </div>:<></>}
        </>
    )
}

export default ShowPokemon