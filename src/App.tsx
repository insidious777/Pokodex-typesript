import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

import PokemonsUrlList from "./Interfaces/pokemonsUrlList";

import ShowPokemon from "./Components/showPokemons";
import ShowCurrentPokemon from "./Components/showCurrentPokemon";
import Pokemon from "./Interfaces/pokemon";


function App() {
  const [pokemonsUrlList,setPokemonsUrlList]=useState<string[]>(['']);
  const [arrPokemon,setArrPokemon]=useState<string[]>(['']);
  const [loaded,setLoaded]=useState<boolean>(false);
  const [visibility,setVisibility]=useState<boolean>(false);
  const [currentPokemon,setCurrentPokemon]=useState<Pokemon>({
    name:'',
    sprites:{front_default:''},
    types:[{slot:0,type:{name:''}}],
    id:0,
    stats:[{base_stat:0,stat:{name:''}}]
  });
  const[first,setFirst]=useState<number>(0);
  const[second,setSecond]=useState<number>(9);

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension () {
    return {
      width: window.innerWidth,
    }
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension);

    return(() => {
      window.removeEventListener('resize', updateDimension);

      if(screenSize.width <= 680){
        setSecond(4)
      }else{
        setSecond(8)
      }
    })
  }, [screenSize])

  useEffect (()=>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=32`)
        .then(res => {
          const pokemons:PokemonsUrlList = res.data;
          setPokemonsUrlList(pokemons.results.map((e)=>e.url));
          setArrPokemon(pokemons.results.map((e)=>e.url).slice(first,second))
          setLoaded(true);
        })
  },[arrPokemon]);

  const loadNext=()=>{
    if(screenSize.width <= 680){
      setFirst(first+4)
      setSecond(second+4)
      setArrPokemon(pokemonsUrlList.slice(first,second))
    }else{
      setFirst(first+8)
      setSecond(second+8)
      setArrPokemon(pokemonsUrlList.slice(first,second))
    }
  }

  const loadPrev=()=>{
    if(screenSize.width <= 680){
      setFirst(first-4)
      setSecond(second-4)
      setArrPokemon(pokemonsUrlList.slice(first,second))
    }else{
      setFirst(first-8)
      setSecond(second-8)
      setArrPokemon(pokemonsUrlList.slice(first,second))
    }
  }


  const showCurrentPokemon = (i:Pokemon) =>{
    setVisibility(true);
    setCurrentPokemon(i);
  }

  const closeCurrentPokemon = ()=>{
    setVisibility(false)
  }

  return (
      <>
        <div className='container'>
          <div className='pokemonsList'>
            {loaded? arrPokemon.map((e,index) =>
                <ShowPokemon key={index} pokemon={e}
                             current={showCurrentPokemon}
                             index={index}
                />
            ):<></>}
            <div className='loadButtons'>
              <button className='navButton' disabled={second===32} onClick={loadNext}>Next</button>
              <button className='navButton' disabled={first===0} onClick={loadPrev}>Previous</button>
            </div>

          </div>
          <div className={ visibility? 'active':'disabled' } onClick={closeCurrentPokemon}>
            <ShowCurrentPokemon currentPokemon={currentPokemon}/>
          </div>
        </div>

      </>

  )
}

export default App;
