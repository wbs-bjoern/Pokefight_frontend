import pokeLogo from "../images/vecteezy_pokemon-logo-png-pokemon-icon-transparent-png_27127571.png"
import PopupForm from "../components/PopupForm";
import { useState, useEffect } from "react";
import Head from "../components/Head";

const Home = () => {
    
    const [titel, setTitel] = useState('');

    const handleNameChange = (newTitel) => {
        console.log("titel", newTitel)
        setTitel(newTitel);
       };


       
     
   
    return (
        <div>
        <Head> 
        <title>PokeFight Game</title>
        </Head>
            <img className="pokeLogo" src={pokeLogo} alt="" />
            <h1>{titel ? `${titel} gonna fight them all` : 'I am gonna fight them all'}</h1>
            <PopupForm onNameChange={handleNameChange} />
        </div>
    )
}


export default Home