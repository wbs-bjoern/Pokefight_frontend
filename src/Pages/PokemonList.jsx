import { useState, useEffect } from "react";
import Head from "../components/Head";

const PokemonList = () => {

const [pokemonList, setPokemonList] = useState()
  
//   Fetch JSON Pokemon-Liste vom Backend

  useEffect(() => {
    fetch("https://pokefight-backend-x2r5.onrender.com/pokemon/")
    // .then(
      // response => response.json())
      // .then(
      //   data => {
      //     setBackend(data)
      //   }
      // )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data =>  {
        console.log(data);
          setPokemonList(data);
          })
      .catch(error => console.error('There has been a problem with your fetch operation: ', error));
  
  }, []);

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
        
        
        <div className="pokemonGrid">
        {pokemonList?.map((pokemon, id) =>
        (<ul className="pokeFilter" key={id}><li>{pokemon.name.french}</li></ul>
        ))}
        </div>

        </div>  
        </div>
        )
        }

        
export default PokemonList