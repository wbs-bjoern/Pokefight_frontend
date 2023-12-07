import { useState, useContext, createContext } from 'react'
import pokeIcon from '/pokeball.png'
import './App.css'
import { Routes, Route } from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import  PokemonList  from './Pages/PokemonList';
import PokemonCard from './Pages/PokedexCard';
import  Home  from "./Pages/Home";
import Fight from "./Pages/Fight";

export const AuthContext = createContext({authToken: null, setAuthToken: ()=>{}});

export const AuthContext = createContext({authToken: null, setAuthToken: ()=>{}});

function App() {
  // const [count, setCount] = useState(0)
  const [authToken, setAuthToken] = useState(null)
  const contextValue = { authToken , setAuthToken };



  return (
    <>
    <AuthContext.Provider value = {contextValue}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemonList" element={<PokemonList />} />
          <Route path="/fight" element={<Fight />} />
          {/* <Route path="/leaderboard" element={<Leaderboard />} /> */} 
          <Route path="/pokemon/:id" element={<PokemonCard />} />
          {/* <Route path="/pokemon/:id/:info" element={<PokemonSuperDetail />} /> */} 
        </Routes>
      </MainLayout>
      </AuthContext.Provider>
    </>
  )
}

export default App
