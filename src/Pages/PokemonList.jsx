import { useState, useEffect } from "react";
import Head from "../components/Head";


const PokemonList = () => {

const [pokemonList, setPokemonList] = useState([])
// const [lastId, setLastId] = useState(1);
const [page, setPage] = useState(0);
const [isLoading, setIsLoading] = useState(true);
// const [filter, setFilter] = useState(['Bug','Grass', 'Poison', 'Fire', 'Grass', 'Normal', 'Rock', 'Dark', 'Fairy', 'Flying', 'Ground', 'Poison', 'Steel', 'Dragon', 'Fighting', 'Ghost', 'Ice', 'Psychic', 'Water']);
const [filter, setFilter] = useState('');
const [showBackButton, setShowBackButton] = useState(false);


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

  // useEffect(() => {
  //   setFilter('');
  //  }, ['Bug','Grass', 'Poison', 'Fire', 'Grass', 'Normal', 'Rock', 'Dark', 'Fairy', 'Flying', 'Ground', 'Poison', 'Steel', 'Dragon', 'Fighting', 'Ghost', 'Ice', 'Psychic', 'Water']);

  // const handlePageChange = () => {
  //   setPage(prevId => prevId + 10);
  // };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredPokemonList = pokemonList.filter(pokemon => {
    // Filter the Pokemons based on the current filter
    // This is just a placeholder. Replace it with your actual filter logic.
    if (filter === '') {
      return true;
    }
    return pokemon.type.some(pokemonType => pokemonType === filter);
  });

  const pokemonsForCurrentPage = filteredPokemonList.slice(start, end);

  return (
    
    <div>
        <Head> 
        <title>Pokemon Liste</title>
        </Head>
        
        <div className="pokedexContainer flex-wrap gap-10">

        <div>
        <h1 className="pb-4">Pokedex</h1>
        <div className="border border-gray-400 p-3 rounded-lg">
        <h2 className="text-3xl text-left pb-5">Filters</h2>
        <hr className="pb-5" />
        <ul className="text-2xl grid grid-cols-3 gap-6 ">
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
        
        
        <div className="pokemonGrid">
        <div className="button-container"> 
        {page > 0 && <button className="text-lg text-white bg-black bg-opacity-60 border-white mr-2" onClick={() => setPage(page - 1)}>Back</button>}
        {page < totalPages - 1 && <button className="text-lg text-white bg-black bg-opacity-60 border-white" onClick={() => setPage(page + 1)}>Next</button>}
        </div>
        {/* <button style={{color: "black"}} onClick={() => { if (page > 0) setPage(page - 1); {() => { setPage(page + 1);}} setShowBackButton(false); }}>Zurück</button>
        <button style={{color: "black"}} onClick={() => { if (page < totalPages - 1) setPage(page + 1); setShowBackButton(true);  }}>Weiter</button>
        {showBackButton && <button style={{color: "black"}} onClick={() => setPage(page - 1)}>Back</button>} */}
        { isLoading ? (
          <div>Loading...</div>
          ) : (
            pokemonsForCurrentPage?.map((pokemon, id) =>
          (<a href={`/pokemon/${pokemon.id}`}><ul className="text-3xl border border-gray-400 p-3 rounded-lg" key={id}>
          <li>#{pokemon.id}</li>
          <li>{pokemon.name.french}</li>
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