import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
 const [data, setData] = useState([]);

 console.log(data)

 useEffect(() => {
   fetch('https://pokefight-backend-x2r5.onrender.com/leaderboard')
     .then(response => response.json())
     .then(data => setData(data))
     .catch(error => console.error('Error:', error));
 }, []);

 return (
   <ol className='text-left'>
     {data.map((item, index) => (
       <li className='mb-3 text-3xl border border-gray-400 p-3 rounded-lg' key={index}>
         {index + 1}. {item.username} - {item.wins} wins
       </li>
     ))}
   </ol>
 );
};

export default Leaderboard;