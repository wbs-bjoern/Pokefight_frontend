import { useState, useEffect,useContext } from "react";
import Head from "../components/Head";
import { AuthContext } from "../App";

    //   const baseURL = "http://localhost:8080/";
      const baseURL = "https://pokefight-backend-x2r5.onrender.com/";

const Fight = () => {

const {authToken} = useContext(AuthContext)
console.log("AuthToken:", authToken)

const [ spieler, setSpieler ] = useState()
const [ randomPokemon, setRandomPokemon ] = useState (null)
const [isLoading, setIsLoading] = useState(true);


console.log(randomPokemon)
console.log(spieler)

// Fetching Spieler 
    // useEffect(() => {
    //     const fetchData = async () => {
    //     setIsLoading(true);
    //    try {
        
    //      const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon`)
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //         setSpieler(data);
    //         } catch (error) { 
    //           console.error ('There has been a problem with your fetch operation: ', error);
    //         } finally {
    //          setIsLoading(false);
    //         }
    //       };
    //   fetchData();
    // }, []);




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
            }
            catch(err)
            {
              console.error ('There has been a problem with your fetch operation: ', err.message);
            }



          };

      
      fetchUserData();
    }, []);


    return (
        <div className="flex">
            <div className="flex grow justify-center">{spieler && <p className="text-2xl">{spieler.username}</p>}</div>
            <div className="flex grow justify-center ">
                <div>
              <p className="text-2xl">Battle</p> 
              <button className="text-black">Start Battle</button> 
              </div>
            </div>
            <div className="flex grow justify-center">{randomPokemon && 
            <div>
            <h2 className="text-2xl">A wild {randomPokemon.name.english} appears</h2>
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