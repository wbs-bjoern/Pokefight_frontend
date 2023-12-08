import { useState, useEffect,useContext } from "react";
import Head from "../components/Head";
import { AuthContext } from "../App";

      //gitconst baseURL = "http://localhost:8080/";
      const baseURL = "https://pokefight-backend-x2r5.onrender.com/";

const Fight = () => {

const {authToken} = useContext(AuthContext)
console.log("AuthToken:", authToken)

const [ spieler, setSpieler ] = useState("")
const [ randomPokemonSpieler, setRandomPokemonSpieler ] = useState ("")
const [ randomPokemon, setRandomPokemon ] = useState ("")
const [isLoading, setIsLoading] = useState(true);
const [ startBattle, setStartBattle ] = useState(null)
const [buttonClicked, setButtonClicked] = useState(false);
// const [pokemon1, setPokemon1] = useState("Blastoise");



console.log("RandomUSer:" , randomPokemon)
console.log("Spieler ",spieler)
console.log("StartBattle", startBattle)


// Fetching RandomPokemonSpieler

useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon`);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            const json = await response.json();
            if (json && json.length > 0) {
                const randomIndex = Math.floor(Math.random() * json.length);
                //setRandomPokemonSpieler(json[randomIndex]);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation: ', error);
            setIsLoading(false);
        }
    };
    fetchData();
  }, []);

// Fetching RandomPokemon

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon`);
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                const json = await response.json();
                if (json && json.length > 0) {
                    const randomIndex = Math.floor(Math.random() * json.length);
                    setRandomPokemon(json[randomIndex]);
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation: ', error);
                setIsLoading(false);
            }
        };
        fetchData();
      }, []);


// Fetching Username
      
      useEffect(() => {
          const fetchUserData = async ()=>
          {

            try{
              const response = await fetch(baseURL + "user",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login_token: authToken }),
               });

               const data = await response.json()
               console.log("UserData: ", data)
               setSpieler(data)

               if (data.ownedPokemon && data.ownedPokemon.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.ownedPokemon.length);
                setRandomPokemonSpieler(data.ownedPokemon[randomIndex]);
            }


            }
            catch(err)
            {
              console.error ('There has been a problem with your fetch operation: ', err.message);
            }



          };

      
      fetchUserData();
    }, []);

    // Fetching Gamemechanism


    useEffect(() => {
        if (buttonClicked) {
          fetchGameData();
        }
      }, [buttonClicked]);
     
      const fetchGameData = async () => {
        try {
          const response = await fetch(baseURL + "fight/start", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "pokemon1": randomPokemonSpieler.name.english,
              "pokemon2": randomPokemon.name.english,
              "trainer1": spieler.username,
              "trainer2": "",
              login_token: authToken
            }),
          });
     
          const data = await response.json();
          console.log("GameData: ", data);
          setStartBattle(data);
        } catch (err) {
          console.error('There has been a problem with your fetch operation: ', err.message);
        }
      };

    
    

    return (
        <div className="flex flex-wrap border border-gray-400 p-3 rounded-lg">
        <Head> 
        <title>Fight</title>
        </Head>
            <div className="flex grow justify-center">
                <div>
                {randomPokemonSpieler && spieler && 
                <h2 className="text-2xl">{spieler.username}'s {randomPokemonSpieler.name.english} is ready!</h2>}
                <div className="flex justify-center">
                {randomPokemonSpieler &&  <img className="h-80" src={randomPokemonSpieler.sprites.other.home.front_default} />}
                </div>
                </div> 
            </div>
            
            <div className="flex grow justify-center ">
                <div>
              <p className="text-2xl">Battle</p> 
              <button className="text-black text-xl mb-4 mt-4" onClick={() => setButtonClicked(true)}>Start Fight</button>
              {/* {startBattle && spieler && <p className="text-2xl mt-4 mb-4">{spieler.username}'s {startBattle.responseString.Winner.pokemon} wins!</p>} */}
              {startBattle && spieler && 
                <p className="text-2xl mt-4 mb-4">
                {startBattle.responseString.Winner.trainer === spieler.username 
                    ? `${spieler.username}'s ${startBattle.responseString.Winner.pokemon} wins! ${startBattle.responseString.CatchAttempt}. ${startBattle.responseString.CatchResult}`
                    : `${spieler.username}'s  ${startBattle.responseString.Loser.pokemon} loses.`}
                </p>
                }

              </div>
            </div>
            <div className="flex grow justify-center">{randomPokemon && 
            <div>
            <h2 className="text-2xl">A wild {randomPokemon.name.english} appears!</h2>
            <div className="flex justify-center"><img className="h-80" src={randomPokemon.sprites.other.home.front_default} /></div> 
            <ul className="flex justify-center flex-wrap">
                    <h3 className="pr-4">weaknesses:</h3>
                    {randomPokemon.damage_relations.double_damage_from.map((pokemon, index) => (
                    <li className="pr-4" key={index}>{pokemon.name}</li>
                    ))}
              </ul>
            </div>}
            
            </div>
        </div>
    )

}


export default Fight