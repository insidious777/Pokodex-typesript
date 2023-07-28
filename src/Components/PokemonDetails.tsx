import '../Styles/showCurrentPokemon.css'
import PokemonDetailsProps from "../Interfaces/PokemonDetailsProps";
export default function PokemonDetails({pokemon}:PokemonDetailsProps){
    return(
        <div className='currentPokemon' key={pokemon.id}>
            <img className='currentPokemonImg' src={pokemon.sprites.front_default}/>
            <p className='currentPokemonName'>{pokemon.name} #{pokemon.id}</p>
            <div className='currentPokemonStatsContainer'>
                <div className='currentPokemonTypes'>
                    <p>Type:</p>
                    {pokemon.types.map((e)=>{return(<p className='currentPokemonType'>{e.type.name}</p>)})}
                </div>
                {pokemon.stats.map((e,index)=>{
                return(
                    <div className='currentPokemonStats' key={index}>
                        <p className='currentPokemonStat'>{e.stat.name}</p>
                        <p className='currentPokemonStat'>{e.base_stat}</p>
                    </div>
                )
            })}</div>
        </div>
    )
}