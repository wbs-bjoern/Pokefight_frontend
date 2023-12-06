import { useState, useEffect } from "react";
import Head from "../components/Head";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PokemonCard = () => {

    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    console.log(id); // logs the id from the URL
    //   Fetch JSON Pokemon-Liste vom Backend
    const navigate = useNavigate();

      useEffect(() => {
            const fetchData = async () => {
            setIsLoading(true);
       try {
        //  const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon?limit=10&offset=${lastId}`)
            const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon/${id}`)
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            // setPokemonList(prevList => [...prevList, ...data]);
            setPokemonList(data);
            // setLastId(data[data.length - 1].id);
      } catch (error) { 
            console.error ('There has been a problem with your fetch operation: ', error);
      } finally {
             setIsLoading(false);
            }
          };
      fetchData();
    }, [id]);

    
    
      return (
           
        <div>
           
           <Head> 
            {/* <title>{pokemonList.id} {pokemonList.name.french}</title> */}
            Hallo
            </Head> 

            <div className="pokedexContainer w-full gap-10">
    
            
           
            { isLoading ? (
            <div>Loading...</div>
            ) : (
            <div className="text-3xl border border-gray-400 p-3 rounded-lg">
            
            <h1 className="mb-4 text-8xl md:text-12xl">{pokemonList.name.french}</h1>
            <div className="flex flex-wrap gap-20 sm">
              <div className="">
                  <ul className=" md:text-left  ">
                    <li>Attack: {pokemonList.base.Attack}</li>
                    <li>Defense: {pokemonList.base.Defense}</li>
                    <li>HP: {pokemonList.base.HP}</li>
                    <li>Sp. Attack: {pokemonList.base['Sp. Attack']}</li>
                    <li>Sp. Defense: {pokemonList.base['Sp. Defense']}</li>
                    <li>Speed: {pokemonList.base.Speed}</li>
                  </ul>
                  <div className="flex justify-center items-center h-full mb-40">
                    <button style={{color: "black"}}>Select Pokemon</button>
                    <button style={{color: "black"}} onClick={() => navigate(-1)}>Back</button>
                  </div>
            </div>
            
            <div className="flex-column">
           
              <ul className="flex justify-center">
                    {pokemonList.damage_relations.double_damage_from.map((pokemon, index) => (
                    <li className="pr-4" key={index}>{pokemon.name}</li>
                    ))}
              </ul>
              <div className="flex justify-center">
                    {pokemonList.sprites && <img src={pokemonList.sprites.other.home.front_default} />}
              </div>
            </div>
            {/* <div>{pokemonList.type}</div> */}
            
            </div>
            </div>

            )}
         
            </div>
    
            </div>
            
            
            )
      
            }
            
    export default PokemonCard