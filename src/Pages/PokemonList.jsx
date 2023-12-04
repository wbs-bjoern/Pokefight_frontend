import { useState, useEffect } from "react";
import Head from "../components/Head";

const PokemonList = () => {

const [pokemonList, setPokemonList] = useState([])
const [lastId, setLastId] = useState(1);
const [isLoading, setIsLoading] = useState(true);
//   Fetch JSON Pokemon-Liste vom Backend

  useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true);
   try {
     const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon?limit=10&offset=${lastId}`)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setPokemonList(prevList => [...prevList, ...data]);
        setLastId(data[data.length - 1].id);
        } catch (error) { 
          console.error ('There has been a problem with your fetch operation: ', error);
        } finally {
         setIsLoading(false);
        }
      };
fetchData();
}, [lastId]);

  const handlePageChange = () => {
    setPage(prevId => prevId + 10);
  };

  return (
    
    <div>
        <Head> 
        <title>Pokemon Liste</title>
        </Head>
        <h1>Pokedex</h1>
        <div className="pokedexContainer">

        <div>
        <h2>Filters</h2>
        <ul className="pokeFilter">
        <li>Bug</li>
        <li>Electric</li>
        <li>Fire</li>
        <li>Grass</li>
        <li>Normal</li>
        <li>Rock</li>
        <li>Dark</li>
        <li>Fairy</li>
        <li>Flying</li>
        <li>Ground</li>
        <li>Poison</li>
        <li>Steel</li>
        <li>Dragon</li>
        <li>Fighting</li>
        <li>Ghost</li>
        <li>Ice</li>
        <li>Psychic</li>
        <li>Water</li>
        </ul>
        </div>
        
        {/* <img src={pokemon.sprites.front_default} /> */}
        <div className="pokemonGrid">
        { isLoading ? (
          <div>Loading...</div>
          ) : (
          pokemonList?.map((pokemon, id) =>
          (<ul className="pokeFilter" key={id}>
          <li>{pokemon.name.french}
          </li>
          <li>{pokemon.base.HP}</li>
          {pokemon.sprites && <img src={pokemon.sprites.front_default} />}
        </ul>)
        ))}
        </div>

        </div>  
        <button style={{color: "black"}} onClick={handlePageChange}>Page 2</button>
        </div>
        )
        }

        
export default PokemonList