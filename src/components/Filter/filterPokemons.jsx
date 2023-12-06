import { useState, useEffect } from "react";


const types = ['Poison', 'Flying'];

types.forEach(type => {
 fetch(`https://pokeapi.co/api/v2/type/${type}`)
   .then(response => response.json())
   .then(data => {
     console.log(data);
   });
});

// const bug = () => {
// fetch('https://pokeapi.co/api/v2/type/10/')
//  .then(response => response.json())
//  .then(data => console.log(data));
// };