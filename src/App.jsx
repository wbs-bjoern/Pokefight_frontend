import { useState } from 'react'
import reactLogo from './assets/react.svg'
import pokeIcon from '/pokeball.png'
import './App.css'
import { Routes, Route } from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import  PokemonList  from './Pages/PokemonList';
import  Home  from "./Pages/Home";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemonList" element={<PokemonList />} />
          {/* <Route path="/fight" element={<Fight />} />
          <Route path="/leaderboard" element={<Leaderboard />} /> */}
          {/* <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/pokemon/:id/:info" element={<PokemonSuperDetail />} /> */}
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
