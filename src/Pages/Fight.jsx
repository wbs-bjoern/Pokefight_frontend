import { useState, useEffect,useContext } from "react";
import Head from "../components/Head";
import { AuthContext } from "../App";

      const baseURL = "http://localhost:8080/";
      //const baseURL = "https://pokefight-backend-x2r5.onrender.com/";

const Fight = () => {

const {authToken} = useContext(AuthContext)
console.log("AuthToken:", authToken)

const [ spieler, setSpieler ] = useState()
const [ randomPokemon, setRandomPokemon ] = useState ([])
const [isLoading, setIsLoading] = useState(true);



 
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
        
         const response = await fetch(`https://pokefight-backend-x2r5.onrender.com/pokemon`)
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setRandomPokemon(data);
            } catch (error) { 
              console.error ('There has been a problem with your fetch operation: ', error);
            } finally {
             setIsLoading(false);
            }
          };
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

      fetchData();
      fetchUserData();
    }, []);


// Choosing RandomPokemon

    function choosingRandomPokemon({ randomPokemon }) {
        const randomIndex = Math.floor(Math.random() * randomPokemon.length);
        const chooseRandomPokemon = randomPokemon[randomIndex]; }

    return (
        <div className="flex">
            <div className="flex grow justify-center">Spieler</div>
            <div className="flex grow justify-center">Gamemechanism</div>
            <div className="flex grow justify-center">{choosingRandomPokemon && <h2>{choosingRandomPokemon.name}</h2>}
            {/* <img src={choosingRandomPokemon.sprites.other.home.front_default} alt={choosingRandomPokemon.name} /> */}
            </div>
        </div>
    )

}


export default Fight