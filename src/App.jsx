import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import  PokemonList  from './Pages/PokemonList';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <MainLayout> */}
        <Routes>
          <Route path="/" element={<PokemonList />} />
          {/* <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/pokemon/:id/:info" element={<PokemonSuperDetail />} /> */}
        </Routes>
      {/* </MainLayout> */}
    </>
  )
}

export default App
