import Pokemon from "./Pokemon";

export default interface PokemonCardProps{
    pokemon: Pokemon,
    onClick: (p: Pokemon) => void
}