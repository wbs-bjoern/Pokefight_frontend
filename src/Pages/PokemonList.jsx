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
        {pokemonList?.map((pokemon, id) =>
        (<p key={id}>{pokemon.name.french}</p>

        ))}
    </div>
        )
        }

        
export default PokemonList