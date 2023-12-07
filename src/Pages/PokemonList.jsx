import { useState, useEffect,useContext } from "react";
import Head from "../components/Head";
import { AuthContext } from "../App";

const PokemonList = () => {

  const {authToken} = useContext(AuthContext)
  console.log("AuthToken:", authToken)

const [pokemonList, setPokemonList] = useState([])
// const [lastId, setLastId] = useState(1);
const [page, setPage] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [filter, setFilter] = useState('');
// const [showBackButton, setShowBackButton] = useState(false);



const pokemonsPerPage = 12;
const start = page * pokemonsPerPage;
const end = start + pokemonsPerPage;
// const pokemonsForCurrentPage = pokemonList.slice(start, end);

const totalPokemons = pokemonList.length;
const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

//   Fetch JSON Pokemon-Liste vom Backend

  useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true);
   try {
    //  const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon?limit=10&offset=${lastId}`)
     const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon`)
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
  // }, [lastId]);
}, []);


  // const handlePageChange = () => {
  //   setPage(prevId => prevId + 10);
  // };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredPokemonList = pokemonList.filter(pokemon => {
    // Filter the Pokemons based on the current filter
    if (filter === '') {
      return true;
    }
    return pokemon.type.some(pokemonType => pokemonType === filter);
  });

  const pokemonsForCurrentPage = filteredPokemonList.slice(start, end);

  return (
    
    <div>
        <Head> 
        <title>Pokedex</title>
        </Head>
        
        <div className="lg:flex flex-wrap gap-10">

        <div>
        <h1 className="pb-4">Pokedex</h1>
        <div className="border border-gray-400 p-3 rounded-lg">
        <div>
        <div>
     
   </div>
        <h2 className="text-3xl text-left pb-5">Filters</h2>
        {/* {showPopup && selectedPokemon && (
                        <div className="fixed inset-0  bg-gray-900 opacity-70 z-50 flex-col items-center justify-center w-85 h-80">
                          <h2 className="mb-5"> Selected Pokemon </h2>
                          {selectedPokemon.name.french}
                          <div className="flex justify-center h-40">{selectedPokemon.sprites && <img src={selectedPokemon.sprites.other.home.front_default} />}</div>
                          <button style={{color: "black"}}  onClick={closePopup}>Close</button>
                        </div>
                        )} */}
        </div> 
        <hr className="pb-5" />
        <ul className="text-2xl grid grid-cols-3 w-full gap-6 ">
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Bug')}>Bug</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Electric')}>Electric</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Fire')}>Fire</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Grass')}>Grass</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Normal')}>Normal</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Rock')}>Rock</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Dark')}>Dark</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Fairy')}>Fairy</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Flying')}>Flying</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Ground')}>Ground</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Poison')}>Poison</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Steel')}>Steel</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Dragon')}>Dragon</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Fighting')}>Fighting</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#" onClick={() => handleFilterChange('Ghost')}>Ghost</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Ice')}>Ice</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Psychic')}>Psychic</a>
        <a className=" hover:text-yellow-100 focus:text-yellow-300 focus:font-bold hover:font-bold" href="#"  onClick={() => handleFilterChange('Water')}>Water</a>
        </ul>
        </div>
        </div>
        
        
        <div className="pokemonGrid grid grid-cols-1 grow md:grid-cols-3 mt-20 gap-4">
        <div className="button-container"> 
        {page > 0 && <button className="text-lg text-white bg-black bg-opacity-60 border-white mr-2" onClick={() => setPage(page - 1)}>Back</button>}
        {page < totalPages - 1 && <button className="text-lg text-white bg-black bg-opacity-60 border-white" onClick={() => setPage(page + 1)}>Next</button>}
        </div>
        
        { isLoading ? (
          <div>Loading...</div>
          ) : (
            pokemonsForCurrentPage?.map((pokemon, id) =>
          (<a key={id} href={`/pokemon/${pokemon.id}`}><ul className="text-3xl border border-gray-400 p-3 rounded-lg" >
          <li>#{pokemon.id}</li>
          <li>{pokemon.name.english}</li>
          <div className="flex justify-center">{pokemon.sprites && <img src={pokemon.sprites.front_default} />}</div>
          <li>{pokemon.type}</li>
        </ul></a>)
        ))}
        </div>

        </div>  
        </div>
        )
        }

        
export default PokemonList