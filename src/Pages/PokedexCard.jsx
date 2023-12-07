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

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

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

    const handlePokemonClick = (pokemon) => {
      setSelectedPokemon(pokemon);
      console.log("pokemon select",pokemon)

     };

     const handlePokemonClick2 = () => {
      

      // console.log()
      setShowPopup(true)
     };
    
     const closePopup = () => {
      setShowPopup(false);
     };
    
      return (
       
        <div>
            {/* <Head> 
          <title>{pokemonList.name.english}  </title>
          
          </Head>  */}
        
            <div className="pokedexContainer w-full gap-10">
    
            
           
            { isLoading ? (
            <div>Loading...</div>
            ) : (
            <div className="text-3xl border border-gray-400 p-3 rounded-lg">
            
            <h1 className="mb-4 text-8xl md:text-12xl">{pokemonList.name.english}</h1>
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
                  <div className="flex flex-wrap justify-center items-center h-full mb-40">
                    
                    <button style={{color: "black"}} onClick={() => navigate(-1)}>Back</button>
                    <div>
                   
                    <button style={{color: "black"}} onClick={() => handlePokemonClick(pokemonList)}>
                          Select Pokemon
                        </button>
                        <button style={{color: "black"}} onClick={() => handlePokemonClick2()}>
                          Show Pokemon
                        </button>
                        {showPopup && selectedPokemon && (
                        <div className="fixed inset-0  bg-gray-900 opacity-70 z-50 flex-col items-center justify-center w-85 h-80">
                          <h2 className="mb-5"> Selected Pokemon </h2>
                          {selectedPokemon.name.english}
                          <div className="flex justify-center h-40">{selectedPokemon.sprites && <img src={selectedPokemon.sprites.other.home.front_default} />}</div>
                          
                        
                          <button style={{color: "black"}}  onClick={closePopup}>Close</button>
                        </div>
                        )}

                      
                    </div>
                  </div>
            </div>
            
            <div className="flex-column">
           
              <ul className="flex justify-center flex-wrap">
                    <h3 className="pr-4">weaknesses:</h3>
                    {pokemonList.damage_relations.double_damage_from.map((pokemon, index) => (
                    <li className="pr-4" key={index}>{pokemon.name}</li>
                    ))}
              </ul>
              <div className="flex justify-center">
                    {pokemonList.sprites && <img src={pokemonList.sprites.other.home.front_default} />}
              </div>
            </div>
            
            </div>
            </div>

            )}
         
            </div>
    
            </div>
            
            
            )
      
            }
            
    export default PokemonCard