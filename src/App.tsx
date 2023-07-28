import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PokemonUrlList from "./Interfaces/PokemonListItem";
import PokemonCard from "./Components/PokemonCard";
import PokemonDetails from "./Components/PokemonDetails";
import Pokemon from "./Interfaces/Pokemon";
import PokemonListItem from "./Interfaces/PokemonListItem";

function App() {
    const isMobileWindow = window.innerWidth <= 680;
    const maxPages = 7;
    const [pokemonLimit, setPokemonLimit] = useState<number>(isMobileWindow? 4 : 8);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [list, setList] = useState<Pokemon[]>([]);

    const changePokemonPerPageCount = () => {
        setPokemonLimit(window.innerWidth <= 680 ? 4 : 8)
    }

    useEffect(() => {
        window.addEventListener('resize', changePokemonPerPageCount);
        getPokemonList(pokemonLimit, currentPage);

        return () => window.removeEventListener('resize', changePokemonPerPageCount)
    }, [pokemonLimit, currentPage])

    async function getPokemonDetailInfo({url}: PokemonListItem){
        const response = await axios.get(url);
        return response.data
    }
    async function getPokemonList(limit:number, page:number){
        setIsLoading(true);
        const offset = page * pokemonLimit;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        const unresolvedPromises = response.data.results.map(getPokemonDetailInfo);
        const results = await Promise.all(unresolvedPromises);
        setList(results)
        setIsLoading(false);
    }

    const nextPageButtonHandler = () => {
        if(currentPage < maxPages){
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPageButtonHandler = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    const closePokemonDetails = () => {
        setSelectedPokemon(null)
    }

    return (
        <div className='container'>
            <div className='pokemonsList'>
                {isLoading ?
                    <h1>Loading</h1>:
                    <>
                        {list.map((p,i: number)=>
                            <PokemonCard
                                pokemon={p}
                                onClick={setSelectedPokemon}
                                key={i}
                            />
                        )}
                    </>
                }

                <div className='loadButtons'>
                    <button className='navButton' disabled={currentPage === 1} onClick={prevPageButtonHandler}>Previous
                    </button>
                    <button className='navButton' disabled={currentPage === maxPages} onClick={nextPageButtonHandler}>Next
                    </button>
                </div>
            </div>

            {
                selectedPokemon &&
                <div className={'active'} onClick={closePokemonDetails}>
                    <PokemonDetails pokemon={selectedPokemon}/>
                </div>
            }

        </div>
    )
}

export default App;
