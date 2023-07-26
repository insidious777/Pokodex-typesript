import currentPokemon from "../Interfaces/currentPokemon";
import '../Styles/showCurrentPokemon.css'

function ShowCurrentPokemon(props:currentPokemon){

    return(
        <div className='currentPokemon' key={props.currentPokemon.id}>
            <img className='currentPokemonImg'src={props.currentPokemon.sprites.front_default}/>
            <p className='currentPokemonName'>{props.currentPokemon.name} #{props.currentPokemon.id}</p>
            <div className='currentPokemonStatsContainer'>
                <div className='currentPokemonTypes'>
                    <p>Type:</p>
                    {props.currentPokemon.types.map((e)=>{return(<p className='currentPokemonType'>{e.type.name}</p>)})}
                </div>
                {props.currentPokemon.stats.map((e,index)=>{
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

export default ShowCurrentPokemon