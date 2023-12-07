import  { useState,useContext } from "react";
import { AuthContext } from "../../App";


function PopupForm({ onNameChange }) {
    const [isOpen, setIsOpen] = useState(true);
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const { authToken, setAuthToken} = useContext(AuthContext)



    const handleSubmit = async (event) => {
      event.preventDefault();
      // Hier können Sie den Namen an Ihre Backend-API senden
      
      console.log("name", username)
      onNameChange(username)

      const baseURL = "http://localhost:8080/";
      //const baseURL = "https://pokefight-backend-x2r5.onrender.com/";

      fetch(baseURL + 'auth/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username, password }),
      })
      .then(response => {
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       return response.json();
      })
      .then(data => {
       // Benutzer wurde erfolgreich authentifiziert
       if(data.login_token)
       {
        console.log("Token found :", data.login_token)
        setAuthToken(data.login_token)
       }
       console.log("Success");
       console.log(data);
       
      })
      .catch(error => {
       // Es gab einen Fehler bei der Authentifizierung
       console.log("Error");
       console.log(error);
      });
      setIsOpen(false);
      };

    

    if (!isOpen) {
        return null
    }

    return (
      <div className="fixed inset-0 bg-gray-900 opacity-70 z-50 flex items-center justify-center">
        <div className="bg-slate-50 p-20 rounded-lg w-[800px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            
              <input
                className="text-4xl border border-gray-400 p-6 w-full rounded-lg"
                placeholder="Enter your Name"
                id="name"
                name="name"
                type="text"
                value={username}
                onChange={e => setName(e.target.value)}
                required
              />
               <input
                className="text-4xl border border-gray-400 p-6 w-full rounded-lg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
     />
            </div>
            <button
              className="w-full text-2xl bg-blue-500 text-white p-5 rounded-3xl hover:bg-blue-600"
              type="submit"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default PopupForm;