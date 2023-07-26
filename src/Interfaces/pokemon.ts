interface Pokemon{
    name:string;
    sprites: {
        front_default:string;
    };
    types:[{slot:number, type:{ name:string}}];
    id:number;
    stats:[{base_stat:number,stat:{name:string}}]
}
export default Pokemon